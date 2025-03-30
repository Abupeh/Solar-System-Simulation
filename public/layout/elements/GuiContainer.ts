import { Container } from "../../environment/interfaces/Container.js";
import { Global } from "../../global/Global.js";
import { GuiElement } from "../class/GuiElement.js";

export class GuiContainer extends GuiElement {
	static COLOR = "#252525EE";
	static SECONDARY_COLOR = "#181818EE";
	static ROUNDNESS = 10;

	static TEXT_COLOR = "#CED4DBDD";
	static FONT_SIZE = 12;
	static FONT_QUALITY = "";

	drawLayer(container: Container, ctx = this.global.ctx) {
		ctx.fillStyle = GuiContainer.TEXT_COLOR;
		ctx.font = `${GuiContainer.FONT_QUALITY} ${GuiContainer.FONT_SIZE}px ${GuiElement.font}`;
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillText(
			container.text,
			container.x + container.width / 2,
			container.y - container.height / 4
		);
	}

	drawBase(container: Container, ctx = this.global.ctx) {
		ctx.fillStyle = GuiContainer.COLOR;
		if (container.color == 'secondary') ctx.fillStyle = GuiContainer.SECONDARY_COLOR;
		if(container.color == 'space') ctx.fillStyle = Global.BACKGROUND_COLOR;
		ctx.beginPath();
		ctx.roundRect(
			container.x,
			container.y,
			container.width,
			container.height,
			GuiContainer.ROUNDNESS
		);
		ctx.fill();
	}
}
