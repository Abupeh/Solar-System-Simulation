import { Button } from "../interfaces/Button.js";

export class ToggleButton extends Button {
	toggled = false;
	protected handleClick(x: number, y: number): void {
		if (!this.onButton(x, y)) return;
		this.toggle();
		this.callback(x, y);
	}

	onToggle(callback: (position: [number, number]) => void) {
		this.callback = (x: number, y: number) => {
			if (!this.toggled) return;
			callback(this.global.camera.getMouse(x, y));
			this.containerCallbacks.forEach((containerCallback) =>
				containerCallback(this.global.camera.getMouse(x, y))
			);
		};
		return this;
	}
	toggle() {
		this.toggled = !this.toggled;
		return this;
	}
}
