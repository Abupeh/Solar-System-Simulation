import { SelectButton } from "../controllers/SelectButton.js";
import { Controller } from "./Controller.js";
import { Global } from "../../global/Global.js";
import { Button } from "./Button.js";
export class Container implements Controller {
	public controllers: Controller[] = [];
	constructor(
		protected global: Global,
		public x: number,
		public y: number,
		public width: number,
		public height: number
	) {}
	contain(controllers: Controller[]) {
		this.controllers = controllers;
		this.controllers.forEach((controller) => {
			if (controller instanceof SelectButton) controller.container = this;
		});
		return this;
	}
	text = ""

	includeText(text: string) {
		this.text = text
		return this;
	}

	public useSecondaryColor = false;
	secondaryColor() {
		this.useSecondaryColor = true;
		return this;
	}

	enabled = true;

	toEnable(enable: boolean) {
		this.enabled = enable;
		this.controllers.forEach((controller) => {
			controller.enabled = this.enabled;
			if(controller instanceof Container) controller.toEnable(enable);
		});
		return this;
	}
	whenEnable(button: Button, disableContainers: Container[]) {
		button.containerCallbacks.push(() => {
			disableContainers.forEach(container => {
				container.toEnable(false);
			})
			this.toEnable(true);
		});
	}
	selectToggle() {
		this.controllers.forEach((controller) => {
			if (controller instanceof SelectButton) controller.toggled = false;
		});
	}
}
