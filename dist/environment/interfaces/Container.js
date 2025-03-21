import { SelectButton } from "../controllers/SelectButton.js";
export class Container {
    global;
    x;
    y;
    width;
    height;
    controllers = [];
    constructor(global, x, y, width, height) {
        this.global = global;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    contain(controllers) {
        this.controllers = controllers;
        this.controllers.forEach((controller) => {
            if (controller instanceof SelectButton)
                controller.container = this;
        });
        return this;
    }
    text = "";
    includeText(text) {
        this.text = text;
        return this;
    }
    useSecondaryColor = false;
    secondaryColor() {
        this.useSecondaryColor = true;
        return this;
    }
    enabled = true;
    toEnable(enable) {
        this.enabled = enable;
        this.controllers.forEach((controller) => {
            controller.enabled = this.enabled;
            if (controller instanceof Container)
                controller.toEnable(enable);
        });
        return this;
    }
    whenEnable(button, disableContainers) {
        button.containerCallbacks.push(() => {
            disableContainers.forEach(container => {
                container.toEnable(false);
            });
            this.toEnable(true);
        });
    }
    selectToggle() {
        this.controllers.forEach((controller) => {
            if (controller instanceof SelectButton)
                controller.toggled = false;
        });
    }
}
