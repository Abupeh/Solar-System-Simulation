import { TextBox } from "../controllers/TextBox.js";
import { ToggleButton } from "../controllers/ToggleButton.js";
import { Container } from "../interfaces/Container.js";
export class Create {
    global;
    universe;
    content;
    Controllers = {};
    controllerList = [];
    container;
    count = 1;
    degree = 0;
    constructor(global, universe, content) {
        this.global = global;
        this.universe = universe;
        this.content = content;
    }
    configureControllers(properties) {
        for (const key in properties) {
            this.count++;
            this.createControllers(key, properties[key]);
        }
    }
    place(sideContainer) {
        this.container = new Container(this.global, 0, 0, 0, 0).contain(this.controllerList);
        this.container.scroll(sideContainer);
        this.container.place(this.content.place, this.Controllers);
    }
    sideContainer() {
        return new Container(this.global, Create.sideX, Create.sideY, Create.cutoffWidth, Create.sideHeight).useColor('secondary');
    }
    ControllerAssign(controller, key, arrayKey, objectKey) {
        this.controllerList.push(controller);
        if (objectKey) {
            if (!this.Controllers[objectKey])
                //@ts-expect-error
                this.Controllers[objectKey] = {};
            if (arrayKey)
                return this.handleArrayKey(controller, arrayKey, objectKey);
            return Object.assign(this.Controllers[objectKey], { [key]: controller });
        }
        if (arrayKey)
            return this.handleArrayKey(controller, arrayKey);
        Object.assign(this.Controllers, { [key]: controller });
    }
    handleArrayKey(controller, arrayKey, objectKey) {
        //@ts-expect-error
        if (objectKey && !this.Controllers[objectKey][arrayKey]) {
            //@ts-expect-error
            this.Controllers[objectKey][arrayKey] = [];
            //@ts-expect-error
            this.Controllers[objectKey][arrayKey].push(controller);
            return;
        }
        if (!this.Controllers[arrayKey])
            this.Controllers[arrayKey] = [];
        this.Controllers[arrayKey].push(controller);
    }
    createControllers(key, property, assign = true, objectKey = "") {
        this.degree = 0;
        if (property instanceof Array) {
            return this.handleArray(key, property, objectKey);
        }
        else if (typeof property == "string" || typeof property == "number") {
            return this.handleString(key, property, assign);
        }
        else if (typeof property == "boolean") {
            this.degree = 1;
            return this.handleBool(key, 1, assign);
        }
        return this.handleObject(key, property);
    }
    handleString(key, property, assign = true) {
        let type = "string";
        if (typeof property == "number")
            type = "number";
        else if (typeof property == "string" && property.startsWith("#"))
            type = "color";
        const textbox = new TextBox(this.global, Create.initialX +
            Create.seperationX * (this.degree + 1) +
            Create.width * 1.5, Create.initialY + Create.seperationY * this.count, Create.width * 2, Create.height, property.toString(), Create.ToDisplay(key), type);
        if (assign)
            this.ControllerAssign(textbox, key);
        return textbox;
    }
    handleBool(key, total, assign = true) {
        const button = new ToggleButton(this.global, Create.initialX + Create.seperation(total) * (this.degree - 1), Create.initialY +
            Create.seperationY *
                (this.count + (total > 1 ? Create.arraySeperationY * 1.5 : 0)), Create.seperation(total) - Create.containerX, Create.height, Create.ToDisplay(key.toString())).secondSize(total);
        button.value = key;
        if (assign)
            this.ControllerAssign(button, key);
        return button;
    }
    handleArray(arrayKey, property, objectKey) {
        const buttons = [];
        for (let i = 0; i < property.length; i++) {
            this.degree++;
            const button = this.handleBool(property[i], property.length, false);
            buttons.push(button);
        }
        const container = this.createArrayContainer(buttons, arrayKey);
        this.count += Create.arraySeperationY * 2;
        this.ControllerAssign(container, arrayKey, undefined, objectKey);
        return buttons;
    }
    createArrayContainer(buttons, arrayKey) {
        return new Container(this.global, Create.initialX - Create.containerX, Create.initialY -
            Create.containerY +
            Create.seperationY * (this.count + Create.arraySeperationY * 1.5), Create.sideWidth + Create.containerX, Create.height + Create.containerY * 2)
            .contain(buttons)
            .includeText(Create.ToDisplay(arrayKey));
    }
    handleObject(objectKey, property) {
        this.count += Create.arraySeperationY;
        for (const key in property) {
            const controller = this.createControllers(key, property[key], false, objectKey);
            if (!(controller instanceof Array))
                this.ControllerAssign(controller, key, undefined, objectKey);
            this.count++;
        }
        this.count--;
        this.count += Create.arraySeperationY;
    }
    static seperation(degree) {
        return this.sideWidth / degree;
    }
    static ToDisplay(text) {
        const replacedText = text.replace(/([a-z])([A-Z])/g, "$1 $2").trim();
        return replacedText.charAt(0).toUpperCase() + replacedText.slice(1);
    }
    static initialX = 80.5;
    static initialY = 15;
    static seperationX = 3.8;
    static seperationY = 4.5;
    static width = 4;
    static height = 3.5;
    static containerX = 0.5;
    static containerY = 0.5;
    static arraySeperationY = 0.3;
    static sideX = 79.5;
    static sideY = 22;
    static sideWidth = 19;
    static sideHeight = 75;
    static scrollSpeed = -22;
    static cutoffX = this.sideX;
    static cutoffY = this.sideY + this.containerY;
    static cutoffWidth = this.sideWidth + (this.initialX - this.sideX) + this.containerX;
    static cutoffHeight = this.sideHeight - this.containerY * 2;
}
