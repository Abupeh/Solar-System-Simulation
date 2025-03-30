import { Create } from "../../environment/context/Create.js";
import { ToggleButton } from "../../environment/controllers/ToggleButton.js";
import { Container } from "../../environment/interfaces/Container.js";
import { Controller } from "../../environment/interfaces/Controller.js";
import { Global } from "../../global/Global.js";

export abstract class GuiElement {
	static font = "Montserrat";
	constructor(protected global: Global) {}
	scale(element: Controller) {
		element.x *= this.global.ratioX;
		element.y *= this.global.ratioY;
		element.width *= this.global.ratioX;
		element.height *= this.global.ratioY;
	}
	draw(element: Controller) {
		if (!element.enabled) return;
		this.cutoff(element);
		this.drawBase(element);
		this.drawLayer(element);
		this.global.ctx.restore();
	}
	abstract drawLayer(element: Controller): void;
	abstract drawBase(element: Controller): void;
	cutoff(element: Controller) {
		if (!element.placeDisplay) return;
		this.global.ctx.save();
		let rect = {
			x: Create.cutoffX,
			y: Create.cutoffY,
			width: Create.cutoffWidth,
			height: Create.cutoffHeight,
		};
		this.scale(rect as Controller);

		this.global.ctx.rect(rect.x, rect.y, rect.width, rect.height);
		this.global.ctx.clip();
	}
}
