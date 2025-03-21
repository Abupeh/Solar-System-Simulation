import { GuiElement } from "../class/GuiElement.js";
import { TextBox } from "../../environment/controllers/TextBox.js";

export class GuiTextBox extends GuiElement {
	static ROUNDNESS = 5;
	static COLOR = "#28282888";
	static FOCUSED_COLOR = "#52525288";

	static TEXT_COLOR = "#CED4DBDD";
	static FONT_SIZE = 12;
	static FONT_QUALITY = "";

	drawLayer(textbox: TextBox, ctx = this.global.ctx) {
		ctx.fillStyle = GuiTextBox.TEXT_COLOR;
		ctx.font = `${GuiTextBox.FONT_QUALITY} ${GuiTextBox.FONT_SIZE}px ${GuiElement.font}`;
		ctx.textAlign = "left";
		ctx.textBaseline = "middle";
		ctx.fillText(
			textbox.displayText,
			textbox.x - textbox.width * 1.25 + GuiTextBox.FONT_SIZE,
			textbox.y + textbox.height / 2
		);
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillText(
			textbox.text,
			textbox.x + textbox.width / 2,
			textbox.y + textbox.height / 2
		);
	}

	drawBase(textbox: TextBox, ctx = this.global.ctx) {
		ctx.fillStyle = GuiTextBox.COLOR;
		if (textbox.focused) ctx.fillStyle = GuiTextBox.FOCUSED_COLOR;
		ctx.beginPath();
		ctx.roundRect(
			textbox.x,
			textbox.y,
			textbox.width,
			textbox.height,
			GuiTextBox.ROUNDNESS
		);
		ctx.fill();
	}
}
