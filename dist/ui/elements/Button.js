import { GuiConfig } from "../../config/guiconfig.js";
import { GuiContainer } from "../container/GuiContainer.js";
export class Button extends GuiContainer {
    x;
    y;
    width;
    height;
    text;
    toggleable;
    callback = (event, toggle = false) => { };
    constructor(x, y, width, height, text, toggleable = false) {
        super(x, y, width, height);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.text = text;
        this.toggleable = toggleable;
        this.canvas.addEventListener("click", (event) => this.handleClick(event));
    }
    toggled = false;
    toggle() {
        this.toggled = true;
        return this;
    }
    toggleCallback = () => { };
    handleClick(event) {
        if (this.disabled)
            return;
        if (event.offsetX > this.x &&
            event.offsetX < this.x + this.width &&
            event.offsetY > this.y &&
            event.offsetY < this.y + this.height) {
            this.toggleCallback();
            if (this.toggleable)
                this.toggled = !this.toggled;
            this.callback(event, this.toggled);
            this.containerCallbacks.forEach((callback) => callback());
        }
    }
    onclick(callback) {
        this.callback = callback;
        return this;
    }
    draw() {
        if (this.disabled)
            return;
        // Draw the button background
        this.ctx.fillStyle = GuiConfig.BUTTON_COLOR;
        if (this.toggled)
            this.ctx.fillStyle = GuiConfig.TOGGLE_COLOR;
        this.ctx.beginPath();
        this.ctx.roundRect(this.x, this.y, this.width, this.height, GuiConfig.ROUNDNESS);
        this.ctx.fill();
        // Draw text
        this.ctx.fillStyle = GuiConfig.TEXT_COLOR;
        this.ctx.font = `${GuiConfig.FONT_SIZE}px Arial`;
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillText(this.text, this.x + this.width / 2, this.y + this.height / 2);
    }
}
