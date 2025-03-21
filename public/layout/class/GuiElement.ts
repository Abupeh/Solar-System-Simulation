import { Controller } from "../../environment/interfaces/Controller.js";
import { Global } from "../../global/Global.js";

export abstract class GuiElement {
	static font = 'Montserrat'
	constructor(protected global: Global) {}
	scale(element: Controller) {
		element.x *= this.global.ratioX;
		element.y *= this.global.ratioY;
		element.width *= this.global.ratioX;
		element.height *= this.global.ratioY;
	}
	draw(element: Controller) {
		if(!element.enabled) return;
		this.drawBase(element);
		this.drawLayer(element);
	}
	abstract drawLayer(element: Controller): void;
	abstract drawBase(element: Controller): void;
}
