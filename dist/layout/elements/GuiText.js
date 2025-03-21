import { GuiElement } from "../class/GuiElement.js";
export class GuiText extends GuiElement {
    static ROUNDNESS = 10;
    static COLOR = "#614cbf";
    static TEXT_COLOR = "#CED4DB";
    static FONT_SIZE = 11;
    static FONT_QUALITY = "";
    drawLayer(text, ctx = this.global.ctx) {
        console.log('drawing');
        ctx.fillStyle = GuiText.TEXT_COLOR;
        ctx.font = `${GuiText.FONT_QUALITY} ${GuiText.FONT_SIZE}px ${GuiElement.font}`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(text.text, text.x + text.width / 2, text.y + text.height / 2);
    }
    drawBase(text, ctx = this.global.ctx) {
        ctx.fillStyle = GuiText.COLOR;
        ctx.beginPath();
        ctx.roundRect(text.x, text.y, text.width, text.height, GuiText.ROUNDNESS);
        ctx.fill();
    }
}
