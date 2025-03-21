import { GuiElement } from "../class/GuiElement.js";
export class GuiButton extends GuiElement {
    display;
    static ROUNDNESS = 10;
    static COLOR = "#A9A9A9";
    static TOGGLE_COLOR = "#C9C9C9";
    static TEXT_COLOR = "#000000";
    static FONT_SIZE = 12;
    constructor(display) {
        super(display);
        this.display = display;
    }
    drawText(button, ctx = this.display.ctx) {
        ctx.fillStyle = GuiButton.TEXT_COLOR;
        ctx.font = `${GuiButton.FONT_SIZE}px Arial`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(button.text, button.x + button.width / 2, button.y + button.height / 2);
    }
    drawSquare(button, ctx = this.display.ctx) {
        ctx.fillStyle = GuiButton.COLOR;
        // if (button.toggled) ctx.fillStyle = ButtonDisplay.TOGGLE_COLOR;
        ctx.beginPath();
        ctx.roundRect(button.x, button.y, button.width, button.height, GuiButton.ROUNDNESS);
        ctx.fill();
    }
}
