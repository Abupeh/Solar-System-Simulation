import { Place } from "./Place.js";
import { Global } from "../../global/Global.js";
import { AstroObject } from "../../components/astro/AstroObject.js";
import { Gui } from "../../layout/container/Gui.js";
import { Container } from "../interfaces/Container.js";
import { Create } from "./Create.js";
import { Controller } from "../interfaces/Controller.js";

export class AstroPlace {
	constructor(private global: Global) {}

	transform() {
		this.global.ctx.translate(
			this.mapX(AstroPlace.centerX),
			this.mapY(AstroPlace.centerY)
		);
	}
	render(astroObject: AstroObject) {
		this.global.astroObjectDisplay.draw(
			astroObject,
			true,
			this.mapX(AstroPlace.zeroRadius)
		);
	}

	configureGui() {
		const container = new Container(
			this.global,
			AstroPlace.sideX,
			AstroPlace.sideY,
			AstroPlace.sideWidth,
			AstroPlace.sideHeight
		).useColor("secondary");

		const spaceContainer = new Container(
			this.global,
			AstroPlace.sideX + AstroPlace.paddingX,
			AstroPlace.sideY + AstroPlace.paddingY,
			AstroPlace.sideWidth - AstroPlace.paddingX * 2,
			AstroPlace.sideHeight - AstroPlace.paddingY * 2
		).useColor("space");

		return [container, spaceContainer];
	}

	mapX(location: number) {
		return this.global.canvas.width * (location / Gui.MAX_RATIO);
	}
	mapY(location: number) {
		return this.global.canvas.height * (location / Gui.MAX_RATIO);
	}

	static zeroRadius = 2.5;
	static sideX = Create.sideX;
	static sideY = 5;
	static sideWidth = Create.cutoffWidth;
	static sideHeight = 16;

	static paddingX = 1.5;
	static paddingY = 1;
	static centerX = this.sideX + this.sideWidth / 2;
	static centerY = this.sideY + this.sideHeight / 2;
}
