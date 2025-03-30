import { GuiElement } from "../class/GuiElement.js";
import { ActionButton } from "../../environment/controllers/ActionButton.js";
import { ToggleButton } from "../../environment/controllers/ToggleButton.js";
export class GuiButton extends GuiElement {
    static ROUNDNESS = 5;
    static COLOR = "#31313188";
    static TOGGLE_COLOR = "#55555588";
    static HOVER_COLOR = "#42424288";
    static TEXT_COLOR = "#CED4DBDD";
    static FONT_SIZE = 11;
    static SECOND_FONT_SIZE = 13;
    static FONT_QUALITY = "";
    drawLayer(button, ctx = this.global.ctx) {
        ctx.fillStyle = GuiButton.TEXT_COLOR;
        ctx.font = `${GuiButton.FONT_QUALITY} ${button.size ? GuiButton.SECOND_FONT_SIZE : GuiButton.FONT_SIZE}px ${GuiElement.font}`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(button.text, button.x + button.width / 2, button.y + button.height / 2);
    }
    drawBase(button, ctx = this.global.ctx) {
        ctx.fillStyle = GuiButton.COLOR;
        if (button.hover)
            ctx.fillStyle = GuiButton.HOVER_COLOR;
        if (button instanceof ActionButton && button.isSelected())
            ctx.fillStyle = GuiButton.TOGGLE_COLOR;
        if (button instanceof ToggleButton && button.toggled)
            ctx.fillStyle = GuiButton.TOGGLE_COLOR;
        ctx.beginPath();
        ctx.roundRect(button.x, button.y, button.width, button.height, GuiButton.ROUNDNESS);
        ctx.fill();
    }
}
