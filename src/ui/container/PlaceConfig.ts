import { SolarSystem } from "../../components/SolarSystem.js";
import { Vector } from "../../components/Vector.js";
import { GuiConfig } from "../../config/guiconfig.js";
import { CelestialBody } from "../../container/CelestialBody.js";
import { BlackHole } from "../../elements/BlackHole.js";
import { Moon } from "../../elements/Moon.js";
import { Planet } from "../../elements/Planet.js";
import { Star } from "../../elements/Star.js";
import { Updater } from "../../updates/Updater.js";
import {
	CelestialBodyData,
	CelestialBodyString,
	CelestialBodyType,
	GuiElement,
} from "../../utils/types";
import { Camera } from "../Camera.js";
import { Button } from "../elements/Button.js";
import { Container } from "../elements/Container.js";
import { TextDisplay } from "../elements/Text.js";
import { TextBox } from "../elements/TextBox.js";
import { Gui } from "../Gui.js";

export class PlaceConfig<
	T extends CelestialBodyString,
	V extends CelestialBodyData,
	Q,
	Types extends readonly string[]
> {
	constructor(
		public gui: Gui,
		public type: T,
		public variables: V,
		public qualities: Q,
		public types: Types
	) {}

	positionTextBox!: TextBox;

	create(mouse: MouseEvent | Vector, solarSystem: SolarSystem) {
		if (mouse instanceof Vector) this.variables.position = new Vector(mouse);
		else this.variables.position = this.gui.camera.getRelativeMouse(mouse);

		this.variables.name = this.type + "-" + this.gui.solarSystem.bodies.length;
		let body!: CelestialBodyType;
		switch (this.type) {
			case "BlackHole":
				body = new BlackHole(this.variables, [...this.currentTypes]);
				break;
			case "Star":
				body = new Star(this.variables, [...this.currentTypes]);
				break;

			case "Planet":
				body = new Planet(this.variables, [...this.currentTypes]);
				break;

			case "Moon":
				body = new Moon(this.variables, [...this.currentTypes]);
				break;
		}
		this.positionTextBox.text = body.position.x.toString();
		if (this.positionTextBox.sideBox)
			this.positionTextBox.sideBox.text = body.position.y.toString();
		this.positionTextBox.textToNumber(true);
		if (body.color.length > 7) body.color = body.color.slice(0, 7);

		solarSystem.bodies.push(body);
		this.iterate(body);
		return body;
	}

	iterate(body: CelestialBody) {
		this.gui.updater.pause = true;
		this.gui.updater.holdpauses.push(body);
		this.gui.updater.holdpauses.forEach((body) => {
			this.gui.updater.updateIterations(body);
		});
	}

	currentTypes: string[] = [];

	createTypes() {
		const types = this.types.map((type, i) => {
			const y = Math.floor(i / GuiConfig.GAPY) * 4.5;
			const x = 4.5 * i - y * GuiConfig.GAPX;
			return new Button(x, y, GuiConfig.GAPX, GuiConfig.GAPY, type, true).onclick(
				(mouse, toggle) => {
					if (!toggle)
						return this.currentTypes.splice(this.currentTypes.indexOf(type), 1);
					this.currentTypes.push(type);
				}
			);
		});
		return new Container(0, 0, 0, 0, types);
	}

	createVariables() {
		this.variables.position = [0, 0];
		const keys = Object.keys(this.variables).map((key, i) => {
			const x = Math.floor(i / (GuiConfig.GAPY + GuiConfig.Y_SPLIT)) * 4.5;
			const y = 4.5 * i - x * GuiConfig.GAPX;
			return new TextDisplay(
				x,
				y + 0.5,
				GuiConfig.GAPX,
				GuiConfig.KEY_HEIGHT,
				key
			);
		});

		const variables = Object.keys(this.variables).map((key, i) => {
			const x = Math.floor(i / (GuiConfig.GAPY + GuiConfig.Y_SPLIT)) * 4.5;
			const y = 4.5 * i - x * GuiConfig.GAPX;
			const textbox = new TextBox(
				x + GuiConfig.GAPX,
				y,
				GuiConfig.GAPX,
				GuiConfig.GAPY,
				this.variables[key as keyof V] as string
			).onchange((value) => {
				if (this.gui.lastBody()) {
					Object.assign(this.gui.lastBody(), { [key as keyof V]: value });
					this.gui.updater.holdpauses.forEach((body) =>
						this.gui.updater.updateIterations(body)
					);
				}
				this.variables[key as keyof V] = value as V[keyof V];
			});
			if (key == "position") this.positionTextBox = textbox;
			return textbox;
		});

		return new Container(0, 0.5, 0, 0, [...variables, ...keys] as GuiElement[]);
	}
}
