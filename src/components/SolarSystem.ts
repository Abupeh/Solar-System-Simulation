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
		// Create stars
		data.stars.forEach((star_) => {
			const star = new Star(star_);
			this.bodies.push(star);
		});

		// Create planets and their moons
		data.planets.forEach((planet_) => {
			if (!planet_.ignore) {
				const planet = new Planet(planet_);

				// Create moons
				planet_.moons?.forEach((moon_) => {
					if(!moon_.ignore) {
						const moon = new Moon(moon_, planet);
						planet.moons.push(moon);
						this.bodies.push(moon);
					}
				});

				this.bodies.push(planet);
			}
		});
	}
	selectPosition(name: string) {
		const body = this.bodies.find((body) => body.name === name);
		return body?.position || new Vector([0, 0]);
	}
	selectBody(name: string) {
		return this.bodies.find((body) => body.name === name) || this.bodies[0];
	}
}
