import { GuiConfig } from "../../config/guiconfig.js";
import { GuiContainer } from "../container/GuiContainer.js";
export class TextDisplay extends GuiContainer {
    x;
    y;
    width;
    height;
    text;
    constructor(x, y, width, height, text) {
        super(x, y, width, height);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.text = text;
    }
    draw() {
        if (this.disabled)
            return;
        // Draw the button background
        this.ctx.fillStyle = GuiConfig.TEXTBOX_COLOR;
        this.ctx.beginPath();
        this.ctx.roundRect(this.x, this.y, this.width, this.height, GuiConfig.KEY_ROUNDNESS);
        this.ctx.fill();
        // Draw text
        this.ctx.fillStyle = GuiConfig.TEXT_COLOR;
        this.ctx.font = `${GuiConfig.FONT_SIZE}px Arial`;
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillText(this.text, this.x + this.width / 2, this.y + this.height / 2);
    }
}
