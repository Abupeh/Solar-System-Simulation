import { GuiElement } from "../class/GuiElement.js";
export class GuiTextBox extends GuiElement {
    static DECIMAL_ALLOWANCE = 100;
    static ROUNDNESS = 5;
    static COLOR = "#28282888";
    static FOCUSED_COLOR = "#55555588";
    static HOVER_COLOR = "#32323288";
    static TEXT_COLOR = "#CED4DBDD";
    static FONT_SIZE = 12;
    static FONT_QUALITY = "";
    drawLayer(textbox, ctx = this.global.ctx) {
        ctx.fillStyle = GuiTextBox.TEXT_COLOR;
        ctx.font = `${GuiTextBox.FONT_QUALITY} ${GuiTextBox.FONT_SIZE}px ${GuiElement.font}`;
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText(textbox.displayText, textbox.x - textbox.width * 1.25 + GuiTextBox.FONT_SIZE, textbox.y + textbox.height / 2);
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        let text = textbox.text;
        if (textbox.type == "number") {
            text = (Math.floor(new Number(textbox.text) * GuiTextBox.DECIMAL_ALLOWANCE) / GuiTextBox.DECIMAL_ALLOWANCE +
                (textbox.text.endsWith(".") ? "." : "")).toString();
        }
        ctx.fillText(text +
            (textbox.percent ? "%" : ""), textbox.x + textbox.width / 2, textbox.y + textbox.height / 2);
    }
    drawBase(textbox, ctx = this.global.ctx) {
        ctx.fillStyle = GuiTextBox.COLOR;
        if (textbox.hover)
            ctx.fillStyle = GuiTextBox.HOVER_COLOR;
        if (textbox.focused)
            ctx.fillStyle = GuiTextBox.FOCUSED_COLOR;
        ctx.beginPath();
        ctx.roundRect(textbox.x, textbox.y, textbox.width, textbox.height, GuiTextBox.ROUNDNESS);
        ctx.fill();
    }
}
