import { Button } from "../interfaces/Button.js";

export class ActionButton extends Button {
	selectCallBack?: (x: number, y: number) => void;

	isSelected() {
		return !!this.selectCallBack;
	}
	private hold = false;
	protected handleClick(x: number, y: number) {
		if (this.onButton(x, y)) {
			if (this.isSelected()) this.hold = true;
			this.selectCallBack = undefined;
		}

		this.selectCallBack?.(x, y);
		this.selectCallBack = undefined;

		if (this.onButton(x, y) && !this.hold)
			this.callback(x, y);

		this.hold = false;
		this.onUpdate();
	}

	onSelectClick(callback: (position: [number, number]) => void) {
		this.callback = () => (this.selectCallBack = (x, y) => {
			callback(this.global.camera.getMouse(x, y));
		});
		return this;
	}
}
