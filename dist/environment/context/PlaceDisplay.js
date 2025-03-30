import { SelectButton } from "../controllers/SelectButton.js";
import { Container } from "../interfaces/Container.js";
import { ToggleButton } from "../controllers/ToggleButton.js";
import { TextBox } from "../controllers/TextBox.js";
import { Place } from "./Place.js";
export class PlaceDisplay {
    static INITIAL_X = 80;
    static INITIAL_Y = 12;
    static X_SEPERATION = 3.8;
    static WIDTH = 4;
    static HEIGHT = 3.5;
    static CONTAINER_X = 0.5;
    static CONTAINER_Y = 0.5;
    static VARIABLE_X = 80;
    static VARIABLE_Y = 19;
    static VARIABLE_START = 13;
    static START = 2.2;
    static VARIABLE_SEPERATION_Y = 4.5;
    static ARRAY_SEPERATION_Y = 0.3;
    static ARRAY_SELECT_Y = 0.4;
    static sideX = 79;
    static sideY = 10;
    static sideWidth = 21;
    static sideHeight = 80;
    static SetTypes = ["type"];
    static x = 0;
    static y = 0;
    static amount = 0;
    static SCROLL_SPEED = -23;
    static cutoffX = this.sideX;
    static cutoffY = this.INITIAL_Y + this.VARIABLE_SEPERATION_Y;
    static cutoffWidth = this.sideWidth;
    static cutoffHeight = this.sideHeight - this.VARIABLE_SEPERATION_Y * 2;
    static pureObject(x) {
        return typeof x === "object" && !Array.isArray(x) && x !== null;
    }
    static createQuality(global, key, variables, template, handleProperties = false, reset = false) {
        this.y++;
        const vars = reset ? () => variables().set.variables : () => variables();
        if (vars()[key] instanceof Array) {
            this.x = 0;
            return this.handleArray(global, key, vars());
        }
        else if (this.pureObject(vars()[key])) {
            if (handleProperties)
                return this.handleProperties(global, () => vars()[key], template);
            return this.handleVariables(global, () => vars()[key], key, template);
        }
        else if (typeof vars()[key] == "boolean") {
            this.x = 1;
            return this.handleBool(global, key, 1).onClick(() => {
                vars()[key] = !vars()[key];
            });
        }
        this.x = 0;
        return this.handleString(global, key, vars()).onChange((value) => {
            vars()[key] = value;
        });
    }
    static handleArray(global, key, variables) {
        const buttons = [];
        const parts = [...variables[key]];
        variables[key] = [];
        if (!this.SetTypes.includes(key))
            this.y += this.ARRAY_SELECT_Y;
        for (let i = 0; i < parts.length; i++) {
            this.x++;
            const selectButton = this.handleBool(global, parts[i], parts.length).onClick(() => {
                if (variables[key].includes(parts[i]))
                    return variables[key].splice(variables[key].indexOf(parts[i]), 1);
                variables[key].push(parts[i]);
            });
            buttons.push(selectButton);
        }
        const container = new Container(global, PlaceDisplay.VARIABLE_X - PlaceDisplay.CONTAINER_X, PlaceDisplay.VARIABLE_Y -
            PlaceDisplay.CONTAINER_Y +
            PlaceDisplay.VARIABLE_SEPERATION_Y *
                (this.y + PlaceDisplay.ARRAY_SEPERATION_Y / 2), PlaceDisplay.X_SEPERATION * this.amount + PlaceDisplay.CONTAINER_X, PlaceDisplay.HEIGHT + PlaceDisplay.CONTAINER_Y * 2).contain(buttons);
        if (!this.SetTypes.includes(key))
            container.includeText(this.ToDisplay(key));
        this.y += this.ARRAY_SEPERATION_Y;
        return container;
    }
    static handleVariables(global, astroObject, varsName, template, reset = false) {
        if (reset) {
            this.x = 0;
            this.y = this.VARIABLE_START;
        }
        this.y--;
        const controllers = [];
        const vars = reset ? () => astroObject().set.variables : () => astroObject();
        for (const key in vars()) {
            if (key == "variables")
                continue;
            const controller = this.createQuality(global, key, astroObject, template, false, reset);
            console.log(key, varsName, !varsName);
            this.PlaceButton(template, { [key]: controller }, varsName);
            controllers.push(controller);
        }
        return new Container(global, 0, 0, 0, 0).contain(controllers);
    }
    static handleProperties(global, astroObject, template, reset = false) {
        if (reset) {
            this.y = -this.START;
        }
        const controllers = [];
        for (const key in astroObject()) {
            if (key == "set" || key == "trail")
                continue;
            if (key == "position" || key == "velocity") {
                this.y -= 0.5;
                const controller = this.createQuality(global, key, astroObject, template, true);
                controllers.push(controller);
            }
        }
        for (const key in astroObject()) {
            if (key == "set" || key == "trail")
                continue;
            if (key == "position" || key == "velocity")
                continue;
            const controller = this.createQuality(global, key, astroObject, template, true);
            this.PlaceButton(template, { [key]: controller });
            controllers.push(controller);
        }
        return new Container(global, 0, 0, 0, 0).contain(controllers);
    }
    static PlaceButton(template, object, varsName) {
        if (varsName && !Place.buttons[template][varsName])
            Place.buttons[template][varsName] = {};
        if (varsName) {
            Object.assign(Place.buttons[template][varsName], object);
            return;
        }
        Object.assign(Place.buttons[template], object);
    }
    static handleBool(global, text, total) {
        return new ToggleButton(global, this.VARIABLE_X + this.seperation(total) * (this.x - 1), this.VARIABLE_Y +
            this.VARIABLE_SEPERATION_Y *
                (this.y + (total > 1 ? PlaceDisplay.ARRAY_SEPERATION_Y / 2 : 0)), this.seperation(total) - this.CONTAINER_X, this.HEIGHT, this.ToDisplay(text)).secondSize(total);
    }
    static seperation(total) {
        return (this.X_SEPERATION * this.amount) / total;
    }
    static ToDisplay(text) {
        const replacedText = text.replace(/([a-z])([A-Z])/g, "$1 $2").trim();
        return replacedText.charAt(0).toUpperCase() + replacedText.slice(1);
    }
    static handleString(global, key, variables) {
        let type = "string";
        if (typeof variables[key] == "number")
            type = "number";
        else if (variables[key].startsWith("#"))
            type = "color";
        return new TextBox(global, this.VARIABLE_X + this.X_SEPERATION * (this.x + 1) + this.WIDTH * 1.5, this.VARIABLE_Y + this.VARIABLE_SEPERATION_Y * this.y, this.WIDTH * 2, this.HEIGHT, variables[key], this.ToDisplay(key), type);
    }
    static setButton(global, x, text) {
        this.amount++;
        return new SelectButton(global, this.INITIAL_X + this.seperation(this.amount) * x, this.INITIAL_Y, this.seperation(this.amount) - this.CONTAINER_X, this.HEIGHT, this.ToDisplay(text));
    }
}
