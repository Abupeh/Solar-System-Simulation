import { UniverseFormat } from "../../core/Universe.d.js";
import { Kinematics } from "../../modules/Kinematics";
import type { AstroProperties, AstroTemplates } from "./AstroObject.d.js";
import { AstroSet } from "../class/AstroSet.js";
import { Planet } from "../templates/Planet.js";
import { Star } from "../templates/Star.js";
import { Moon } from "../templates/Moon.js";
import { BlackHole } from "../templates/BlackHole.js";
import { Astroid } from "../templates/Asteroid.js";
// type SpecralType = "O" | "B" | "A" | "F" | "G" | "K" | "M"

export const Astro = {
	Planet,
	Star,
	Moon,
	BlackHole,
	Astroid,
};
export class AstroObject {
	static count = 0;
	static createName(universeFormat: UniverseFormat, type: AstroTemplates) {
		return type + ":" + AstroObject.count++ + universeFormat;
	}
	public name: string;

	public mass = 1000;
	public radius = 2000;
	public gravity = 1;
	public surfaceTemperature = 0; //!
	public age = 0; //!
	public color = "#AABBCC";

	get density() {
		return this.mass / this.radius;
	}
	public trail: [number, number][] = [];

	constructor(
		universeFormat: UniverseFormat,
		public kinematics: Kinematics,
		public set: AstroSet<any>,
		properties?: AstroProperties,
	) {
		Object.assign(this, properties);
		this.name ||= AstroObject.createName(universeFormat, this.set.display as AstroTemplates);
		this.set.create(this);
	}

	update(astroObjects: AstroObject[]) {
		this.set.update(this);
		this.kinematics.applyGravitationalForce(
			astroObjects,
			this.gravity,
			this.mass
		);
		this.kinematics.applyPositionalForce();
	}
}
