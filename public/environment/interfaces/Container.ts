import { SelectButton } from "../controllers/SelectButton.js";
import { Controller } from "./Controller.js";
import { Global } from "../../global/Global.js";
import { Button } from "./Button.js";
import { PlaceDisplay } from "../context/PlaceDisplay.js";
import { Camera } from "../../display/base/Camera.js";
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
	text = "";

	includeText(text: string) {
		this.text = text;
		return this;
	}

	scroll(sideContainer: Container) {
		this.global.event.scroll((scroll) =>
			this.handleScroll(sideContainer, scroll)
		);
		return this;
	}
	handleScroll(sideContainer: Container, scroll: number) {
		if (
			!this.onContainer(
				sideContainer,
				this.global.event.mouseX,
				this.global.event.mouseY
			)
		)
			return (Camera.ENABLE_SCROLL = true);

		Camera.ENABLE_SCROLL = false;
		this.controllers.forEach((controller) => {
			const scrollAmount = scroll * PlaceDisplay.SCROLL_SPEED;
			controller.y += scrollAmount;

			if (controller instanceof Container)
				controller.handleScroll(sideContainer, scroll);
		});
	}

	public placeDisplay = false;
	place() {
		this.controllers.forEach((controller) => {
			controller.placeDisplay = true;
			if (controller instanceof Container) controller.place();
		});
		this.placeDisplay = true;
		return this;
	}

	onContainer(container: Container, x: number, y: number) {
		return (
			x > container.x &&
			x < container.x + container.width &&
			y > container.y &&
			y < container.y + container.height
		);
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
			if (controller instanceof Container) controller.toEnable(enable);
		});
		return this;
	}
	whenEnable(button: Button, disableContainers: Container[]) {
		button.containerCallbacks.push(() => {
			disableContainers.forEach((container) => {
				container.toEnable(false);
			});
			this.toEnable(true);
		});
	}
	selectToggle() {
		this.controllers.forEach((controller) => {
			if (controller instanceof SelectButton) controller.toggled = false;
		});
	}
}
