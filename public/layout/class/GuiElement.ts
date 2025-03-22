import { PlaceDisplay } from "../../environment/context/PlaceDisplay.js";
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
		if(!element.placeDisplay) return;
		this.global.ctx.save();
		const rect = {
			x: PlaceDisplay.cutoffX,
			y: PlaceDisplay.cutoffY,
			width: PlaceDisplay.cutoffWidth,
			height: PlaceDisplay.cutoffHeight,
			placeDisplay: false,
			enabled: false,
		}
		this.scale(rect)
		this.global.ctx.rect(rect.x, rect.y, rect.width, rect.height);
		this.global.ctx.clip();
	}
}
