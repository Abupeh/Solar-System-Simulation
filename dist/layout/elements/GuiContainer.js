import { GuiElement } from "../class/GuiElement.js";
export class GuiContainer extends GuiElement {
    static COLOR = "#252525EE";
    static SECONDARY_COLOR = "#181818EE";
    static ROUNDNESS = 5;
    static TEXT_COLOR = "#CED4DBDD";
    static FONT_SIZE = 12;
    static FONT_QUALITY = "";
    drawLayer(container, ctx = this.global.ctx) {
        ctx.fillStyle = GuiContainer.TEXT_COLOR;
        ctx.font = `${GuiContainer.FONT_QUALITY} ${GuiContainer.FONT_SIZE}px ${GuiElement.font}`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(container.text, container.x + container.width / 2, container.y - container.height / 4);
    }
    drawBase(container, ctx = this.global.ctx) {
        ctx.fillStyle = GuiContainer.COLOR;
        if (container.useSecondaryColor)
            ctx.fillStyle = GuiContainer.SECONDARY_COLOR;
        ctx.beginPath();
        ctx.roundRect(container.x, container.y, container.width, container.height, GuiContainer.ROUNDNESS);
        ctx.fill();
    }
}
