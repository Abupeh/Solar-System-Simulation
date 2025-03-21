import { ActionButton } from "../environment/controllers/ActionButton.js";
import { TextBox } from "../environment/controllers/TextBox.js";
export class Cursor {
    global;
    constructor(global) {
        this.global = global;
    }
    grab() {
        this.global.canvas.style.cursor = "grabbing";
    }
    basic() {
        this.global.canvas.style.cursor = "";
    }
    select() {
        this.global.canvas.style.cursor = "crosshair";
    }
    hover() {
        this.global.canvas.style.cursor = "pointer";
    }
    text() {
        this.global.canvas.style.cursor = "text";
    }
    followControllers(controllers) {
        for (const controller of controllers) {
            if (controller instanceof TextBox && controller.focused)
                return this.text();
            if ("hover" in controller && controller.hover)
                return this.hover();
            if (controller instanceof ActionButton && controller.selectCallBack)
                return this.select();
        }
    }
    followCamera(camera) {
        if (camera.drag.active)
            return this.grab();
        this.basic();
    }
}
