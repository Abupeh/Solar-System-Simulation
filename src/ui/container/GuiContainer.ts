import { GuiConfig } from "../../config/guiconfig.js";
import { TextBox } from "../elements/TextBox.js";

export class GuiContainer {
	public canvas = document.getElementById("canvas") as HTMLCanvasElement;
	public ctx = this.canvas.getContext("2d")!;
	constructor(
		public x: number,
		public y: number,
		public width: number,
		public height: number
	) {}

	protected disabled = false;
	disable() {
		this.disabled = true;
	}
	enable() {
		this.disabled = false;
	}

	containerCallbacks: (() => void)[] = []

	draw() {}
}
