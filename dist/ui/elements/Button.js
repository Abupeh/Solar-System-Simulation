import { GuiConfig } from "../../config/guiconfig.js";
export class Button {
    x;
    y;
    width;
    height;
    text;
    canvas = document.getElementById("canvas");
    ctx = this.canvas.getContext("2d");
    callback = (event) => { };
    constructor(x, y, width, height, text) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.text = text;
        this.canvas.addEventListener("click", (event) => this.handleClick(event));
    }
    handleClick(event) {
        if (event.offsetX > this.x &&
            event.offsetX < this.x + this.width &&
            event.offsetY > this.y &&
            event.offsetY < this.y + this.height) {
            this.callback(event);
        }
    }
    onclick(callback) {
        this.callback = callback;
        return this;
    }
    draw() {
        // Draw the button background
        this.ctx.fillStyle = GuiConfig.BUTTON_COLOR;
        this.ctx.beginPath();
        this.ctx.roundRect(this.x, this.y, this.width, this.height, 10);
        this.ctx.fill();
        // Draw text
        this.ctx.fillStyle = " #FFFFFF";
        this.ctx.font = "24px Arial";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillText(this.text, this.x + this.width / 2, this.y + this.height / 2);
    }
}
