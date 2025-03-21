import { SelectButton } from "../controllers/SelectButton.js";
import { Container } from "../interfaces/Container.js";
import { ToggleButton } from "../controllers/ToggleButton.js";
import { TextBox } from "../controllers/TextBox.js";
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
    static pureObject(x) {
        return typeof x === "object" && !Array.isArray(x) && x !== null;
    }
    static createQuality(global, key, set) {
        this.y++;
        if (set.variables[key] instanceof Array) {
            this.x = 0;
            return this.handleArray(global, key, set);
        }
        else if (this.pureObject(set.variables[key])) {
            return this.handleVariables(global, set.variables[key]);
        }
        else if (typeof set.variables[key] == "boolean") {
            this.x = 1;
            return this.handleBool(global, key, 1).onClick(() => {
                set.variables[key] = !set.variables[key];
            });
        }
        this.x = 0;
        return this.handleString(global, key, set).onChange((value) => {
            set.variables[key] = value;
        });
    }
    static handleArray(global, key, set) {
        const buttons = [];
        const parts = [...set.variables[key]];
        set.variables[key] = [];
        if (!this.SetTypes.includes(key))
            this.y += this.ARRAY_SELECT_Y;
        for (const part of parts) {
            this.x++;
            const selectButton = this.handleBool(global, part, parts.length).onClick(() => {
                if (set.variables[key].includes(part))
                    return set.variables[key].splice(set.variables[key].indexOf(part), 1);
                set.variables[key].push(part);
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
    static handleVariables(global, set, reset = false) {
        if (reset) {
            this.x = 0;
            this.y = 0;
        }
        this.y--;
        const controllers = [];
        const object = "variables" in set
            ? set
            : (set.variables = set);
        for (const key in object.variables) {
            if (key == "variables")
                continue;
            const controller = this.createQuality(global, key, object);
            controllers.push(controller);
        }
        return new Container(global, 0, 0, 0, 0).contain(controllers);
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
    static handleString(global, key, set) {
        let type = "string";
        if (typeof set.variables[key] == "number")
            type = "number";
        else if (set.variables[key].startsWith("#"))
            type = "color";
        return new TextBox(global, this.VARIABLE_X + this.X_SEPERATION * (this.x + 1) + this.WIDTH * 1.5, this.VARIABLE_Y + this.VARIABLE_SEPERATION_Y * this.y, this.WIDTH * 2, this.HEIGHT, set.variables[key], this.ToDisplay(key), type);
    }
    static setButton(global, x, text) {
        this.amount++;
        return new SelectButton(global, this.INITIAL_X + this.seperation(this.amount) * x, this.INITIAL_Y, this.seperation(this.amount) - this.CONTAINER_X, this.HEIGHT, this.ToDisplay(text));
    }
}
