import { Camera } from "../display/base/Camera.js";
import { ActionButton } from "../environment/controllers/ActionButton.js";
import { SelectButton } from "../environment/controllers/SelectButton.js";
import { TextBox } from "../environment/controllers/TextBox.js";
import { Button } from "../environment/interfaces/Button.js";
import { Controller } from "../environment/interfaces/Controller.js";
import { Global } from "../global/Global.js";

export class Cursor {
	constructor(private global: Global) {}
	grab() {
		this.global.canvas.style.cursor = "grabbing";
	}
	basic() {
		this.global.canvas.style.cursor = "";
	}
	select() {
		this.global.canvas.style.cursor = "crosshair";
	}
	hover() {
		this.global.canvas.style.cursor = "pointer";
	}
	text() {
		this.global.canvas.style.cursor = "text";
	}

	followControllers(controllers: Controller[]) {
		for (const controller of controllers) {
			if (controller instanceof TextBox && controller.focused) return this.text();
			if ("hover" in controller && controller.hover) return this.hover();
			if (controller instanceof ActionButton && controller.selectCallBack)
				return this.select();
		}
	}

	followCamera(camera: Camera) {
		if (camera.drag.active) return this.grab();
		this.basic();
	}
}
