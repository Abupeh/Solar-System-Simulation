import { GuiConfig } from "../../config/guiconfig.js";
import { GuiContainer } from "../container/GuiContainer.js";
import { Button } from "./Button.js";
import { TextBox } from "./TextBox.js";
export class Container extends GuiContainer {
    x;
    y;
    width;
    height;
    elements;
    constructor(x, y, width, height, elements) {
        super(x, y, width, height);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.elements = elements;
    }
    configureElements() {
        this.elements.forEach((element) => {
            if (element instanceof TextBox && element.sideBox)
                this.elements.push(element.sideBox);
        });
        this.elements.forEach((element) => {
            element.x += this.x;
            element.y += this.y;
            element.containerCallbacks = this.callbacks;
        });
    }
    callbacks = [];
    includeFullToggle() {
        this.elements.forEach((element) => {
            if (!(element instanceof Button))
                return;
            element.toggleable = true;
            element.toggleCallback = () => {
                this.elements.forEach((element) => {
                    if (element instanceof Button)
                        element.toggled = false;
                });
            };
        });
        return this;
    }
    fillStyle = GuiConfig.CONTAINER_COLOR;
    color(color) {
        this.fillStyle = color;
        return this;
    }
    disable() {
        this.disabled = true;
        this.elements.forEach((element) => {
            element.disable();
        });
    }
    enable() {
        this.disabled = false;
        this.elements.forEach((element) => {
            element.enable();
        });
    }
    singleEnable(checks, runContainer) {
        const setElements = () => {
            this.elements.forEach((element, i) => {
                if (checks[i]())
                    return element.enable();
                return element.disable();
            });
        };
        setElements();
        runContainer.callbacks.push(setElements);
        return this;
    }
    draw() {
        if (this.disabled)
            return;
        this.ctx.fillStyle = this.fillStyle;
        this.ctx.beginPath();
        this.ctx.roundRect(this.x, this.y, this.width, this.height, GuiConfig.ROUNDNESS);
        this.ctx.fill();
        this.elements.map((element) => element.draw());
    }
}
