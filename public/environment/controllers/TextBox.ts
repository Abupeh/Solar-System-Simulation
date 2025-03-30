import { Controller } from "../interfaces/Controller";
import { Global } from "../../global/Global";
export type TextBoxType = "string" | "number" | "color";
export class TextBox implements Controller {
	public enabled = true;
	constructor(
		private global: Global,
		public x: number,
		public y: number,
		public width: number,
		public height: number,
		public text: string,
		public displayText: string,
		public type: TextBoxType
	) {
        this.text = this.text.toString();
		this.global.event.onclick(this.handleClick.bind(this));
		document.addEventListener("keydown", this.handleKeyDown.bind(this));
		this.global.event.onmousemove(this.handleHover.bind(this));
		this.complete();
	}

	public placeDisplay = false;

	focused = false;

	onUpdate = () => {};

	public handleClick(x: number, y: number) {
		if (this.focused) return this.complete();
		if (!this.onBox(x, y)) return;
		this.global.content.controllers.forEach(
			(controller) => controller instanceof TextBox && (controller.focused = false)
		);
		this.focused = !this.focused;
	}
	static checkRGB(rgb: string) {
        rgb = rgb.replaceAll(/[^0-9a-fA-F]/gi, "a");
		if (rgb[0] != "#") rgb = '#' + rgb.slice(1);
		if (rgb.length < 7) rgb = rgb.padEnd(7, "a");
		if (rgb.length > 7) rgb = rgb.slice(0, 7);
		return rgb
	}

	onChange(callback: (value: string | number) => void) {
		this.callback = () => callback(this.value);
		return this;
	}

	callback: (value: string | number) => void = () => {};

    static checkAllowed(text: string) {
        return text.replaceAll(/[^0-9a-zA-Z\.]/gi, "");
    }
	public handleKeyDown(event: KeyboardEvent) {
		if (!this.focused) return;
        this.text = TextBox.checkAllowed(this.text);
		if (event.key == "Backspace") this.text = this.text.slice(0, -1);
		if (event.key == "Enter") this.complete();
		if (this.type == "number") {
			if (event.key < "0" || event.key > "9") return;
		}

        if(this.type == "color" && this.text[0] != '#') this.text = "#" + this.text;

		if (event.key.length > 1) return;
		this.text += event.key;
	}

	public complete() {
		this.focused = false;
		if (this.type == "color") this.text = TextBox.checkRGB(this.text);
		this.value = this.text;
		if (this.type == "number") {
			if(this.text.length == 0) this.text = "0";
            this.value = new Number(this.text) as number;
        }
		this.text = this.value.toString();
		this.callback(this.value);
		this.onUpdate();
	}

	value: string | number = "";

	public hover = false;
	handleHover(x: number, y: number) {
		if (this.onBox(x, y)) return (this.hover = true);
		this.hover = false;
	}
	onBox(x: number, y: number) {
		if (!this.enabled) return;
		return (
			x > this.x &&
			x < this.x + this.width &&
			y > this.y &&
			y < this.y + this.height
		);
	}
}
