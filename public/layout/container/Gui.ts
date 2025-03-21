import { Global } from "../../global/Global.js";
import { GuiButton } from "../elements/GuiButton.js";
import { Button } from "../../environment/interfaces/Button.js";
import { GuiContainer } from "../elements/GuiContainer.js";
import { Container } from "../../environment/interfaces/Container.js";
import { TextBox } from "../../environment/controllers/TextBox.js";
import { GuiTextBox } from "../elements/GuiTextBox.js";

export class Gui {
	static MAX_RATIO = 100;

	public GuiButton: GuiButton;
	public GuiContainer: GuiContainer;
	public GuiTextBox: GuiTextBox;
	constructor(private global: Global) {
		this.GuiButton = new GuiButton(this.global);
		this.GuiContainer = new GuiContainer(this.global);
		this.GuiTextBox = new GuiTextBox(this.global);
		this.configureFont();
	}

	configureFont() {
		const font = new FontFace(
			"Montserrat",
			"url(https://fonts.gstatic.com/s/montserrat/v25/JTUQjIg1_i6t8kCHKm45_dJE3gnD-A.woff2)"
		);

		font.load().then((loadedFont) => document.fonts.add(loadedFont));
	}

	scale({ controllers } = this.global.content) {
		controllers.forEach((controller) => {
			if (controller instanceof Button) this.GuiButton.scale(controller);
			if (controller instanceof Container) this.GuiContainer.scale(controller);
			if (controller instanceof TextBox) this.GuiTextBox.scale(controller);
		});
	}
	render({ controllers } = this.global.content) {
		controllers.forEach((controller) => {
			if (controller instanceof Button) this.GuiButton.draw(controller);
			if (controller instanceof Container) this.GuiContainer.draw(controller);
			if (controller instanceof TextBox) this.GuiTextBox.draw(controller);
		});
	}
}
