import { GuiConfig } from "../../config/guiconfig.js";

export class Button {
	public canvas = document.getElementById("canvas") as HTMLCanvasElement;
	public ctx = this.canvas.getContext("2d")!;
	private callback = (event: MouseEvent) => {};
	constructor(
		public x: number,
		public y: number,
		public width: number,
		public height: number,
		public text: string
	) {
		this.canvas.addEventListener("click", (event) => this.handleClick(event));
	}

	handleClick(event: MouseEvent) {
		if (
			event.offsetX > this.x &&
			event.offsetX < this.x + this.width &&
			event.offsetY > this.y &&
			event.offsetY < this.y + this.height
		) {
			this.callback(event);
		}
	}
	onclick(callback: (event: MouseEvent) => void) {
		this.callback = callback;
		return this;
	}

	draw() {
		// Draw the button background
		this.ctx.fillStyle = GuiConfig.BUTTON_COLOR;
		this.ctx.beginPath();
		this.ctx.roundRect(this.x, this.y, this.width, this.height, 10);
		this.ctx.fill();

		// Draw text
		this.ctx.fillStyle = " #FFFFFF";
		this.ctx.font = "24px Arial";
		this.ctx.textAlign = "center";
		this.ctx.textBaseline = "middle";
		this.ctx.fillText(this.text, this.x + this.width / 2, this.y + this.height / 2);
	}
}
