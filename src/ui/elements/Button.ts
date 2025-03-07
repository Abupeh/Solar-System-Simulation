import { GuiConfig } from "../../config/guiconfig.js";
import { GuiContainer } from "../container/GuiContainer.js";

export class Button extends GuiContainer {
	private callback = (event: MouseEvent, toggle = false) => {};
	constructor(
		public x: number,
		public y: number,
		public width: number,
		public height: number,
		public text: string,
		public toggleable = false
	) {
		super(x, y, width, height);
		this.canvas.addEventListener("click", (event) => this.handleClick(event));
	}

	toggled = false;
	toggle() {
		this.toggled = true;
		return this;
	}
	public toggleCallback = () => {};
	handleClick(event: MouseEvent) {
		if (this.disabled) return;
		if (
			event.offsetX > this.x &&
			event.offsetX < this.x + this.width &&
			event.offsetY > this.y &&
			event.offsetY < this.y + this.height
		) {
			this.toggleCallback();
			if (this.toggleable) this.toggled = !this.toggled;
			this.callback(event, this.toggled);
			this.containerCallback();
		}
	}
	onclick(callback: (event: MouseEvent, toggle?: boolean) => void) {
		this.callback = callback;
		return this;
	}

	draw() {
		if (this.disabled) return;
		// Draw the button background
		this.ctx.fillStyle = GuiConfig.BUTTON_COLOR;
		if (this.toggled) this.ctx.fillStyle = GuiConfig.TOGGLE_COLOR;
		this.ctx.beginPath();
		this.ctx.roundRect(this.x, this.y, this.width, this.height, 10);
		this.ctx.fill();

		// Draw text
		this.ctx.fillStyle = " #FFFFFF";
		this.ctx.font = "24px Arial";
		this.ctx.textAlign = "center";
		this.ctx.textBaseline = "middle";
		this.ctx.fillText(
			this.text,
			this.x + this.width / 2,
			this.y + this.height / 2
		);
	}
}
