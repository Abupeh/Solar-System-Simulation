import { Global } from "../../global/Global.js";
import { Controller } from "./Controller.js";
export abstract class Button implements Controller {
	callback: (x: number, y: number) => void = () => {};
	public containerCallbacks: ((position: [number, number]) => void)[] = [];
	constructor(
		protected global: Global,
		public x: number,
		public y: number,
		public width: number,
		public height: number,
		public text: string,
	) {
		this.global.event.onclick(this.handleClick.bind(this));
		this.global.event.onmousemove(this.handleHover.bind(this));
	}
	protected abstract handleClick(x: number, y: number): void;

	public hover = false;
	handleHover(x: number, y: number) {
		if (this.onButton(x, y)) return (this.hover = true);
		this.hover = false;
	}

	defaultClick() {
		if ("toggled" in this) this.toggled = true;
		this.callback(0, 0);
	}

	public placeDisplay = false;

	size = 0;
	secondSize(total: number) {
		if (total == 1) this.size++;
		return this;
	}

	enabled = true;

	onClick(callback: (position: [number, number]) => void) {
		this.callback = (x: number, y: number) => {
			callback(this.global.camera.getMouse(x, y));
			this.containerCallbacks.forEach((containerCallback) =>
				containerCallback(this.global.camera.getMouse(x, y))
			);
		};
		return this;
	}

	onButton(x: number, y: number) {
		if (!this.enabled) return;
		return (
			x > this.x &&
			x < this.x + this.width &&
			y > this.y &&
			y < this.y + this.height
		);
	}
}
