import { Config } from "../config/config.js";
import { Vector } from "./Vector.js";
import { CelestialBody } from "../container/CelestialBody.js";
import { Planet } from "../elements/Planet.js";
import { Star } from "../elements/Star.js";
import { SystemData } from "../utils/types.js";
import { Moon } from "../elements/Moon.js";

export class SolarSystem {
	public bodies: CelestialBody[] = [];

	constructor(public position: Vector = new Vector([0, 0])) {}
	importBodies(data: SystemData) {
		this.bodies.push(...data.stars.map(star => new Star(star)));
		this.bodies.push(...data.planets.map(planet => new Planet(planet)));
		this.bodies.push(...data.moons.map(moon => new Moon(moon)));
	}
	selectPosition(name: string) {
		const body = this.bodies.find((body) => body.name === name);
		return body?.position || null
	}
	selectBody(name: string) {
		return this.bodies.find((body) => body.name === name) || null
	}
}
