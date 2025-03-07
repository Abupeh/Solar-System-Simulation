import { GuiConfig } from "../../config/guiconfig.js";
import { GuiContainer } from "../container/GuiContainer.js";
import { GuiElement } from "../Gui.js";
import { Button } from "./Button.js";
type Check = () => boolean;
export class Container extends GuiContainer {
	constructor(
		public x: number,
		public y: number,
		public width: number,
		public height: number,
		public elements: GuiElement[]
	) {
		super(x, y, width, height);
	}

	configureElements() {
		this.elements.forEach((element) => {
			element.x += this.x;
			element.y += this.y;
			element.containerCallback = () => this.callback()
		});
	}
	callback = () => {};

	includeFullToggle() {
		this.elements.forEach((element) => {
			if (!(element instanceof Button)) return;
			element.toggleable = true;
			element.toggleCallback = () => {
				this.elements.forEach((element) => {
					if (element instanceof Button) element.toggled = false;
				});
			};
		});
		return this;
	}

	fillStyle = GuiConfig.CONTAINER_COLOR;
	color(color: string) {
		this.fillStyle = color
		return this;
	}

	disable() {
		this.disabled = true;
		this.elements.forEach((element) => {
			element.disable();
		});
	}

	enable() {
		this.disabled = false;
		this.elements.forEach((element) => {
			element.enable();
		});
	}

	singleEnable(checks: Check[], runContainer: Container) {
		const setElements = () => {
			this.elements.forEach((element, i) => {
				if (checks[i]()) return element.enable();
				return element.disable();
			});
		};
		setElements();
		runContainer.callback = setElements;
		return this;
	}

	draw() {
		if (this.disabled) return;
		this.ctx.fillStyle = this.fillStyle
		this.ctx.beginPath();
		this.ctx.roundRect(this.x, this.y, this.width, this.height, 10);
		this.ctx.fill();

		this.elements.map((element) => element.draw());
	}
}
