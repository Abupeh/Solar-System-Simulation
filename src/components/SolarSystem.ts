import { Config } from "../config/config.js";
import { Vector } from "./Vector.js";
import { CelestialBody } from "../container/CelestialBody.js";
import { Planet } from "../elements/Planet.js";
import { Star } from "../elements/Star.js";
import { SystemData } from "../utils/types.js";
import { Moon } from "../elements/Moon.js";
import { BlackHole } from "../elements/BlackHole.js";

export class SolarSystem {
	public bodies: CelestialBody[] = [];

	constructor(public position: Vector = new Vector([0, 0])) {}

	async importExperiment(json: string) {
		const response = await fetch(json + ".json");
		const data = (await response.json()) as SystemData;
		this.importBodies(data);
		return this;
	}

	importBodies(data: SystemData) {
		data.stars &&
			this.bodies.push(...data.stars.map((star) => new Star(star, star.types)));
		data.planets &&
			this.bodies.push(
				...data.planets.map((planet) => new Planet(planet, planet.types))
			);
		data.moons &&
			this.bodies.push(...data.moons.map((moon) => new Moon(moon, moon.types)));
		data.blackholes &&
			this.bodies.push(
				...data.blackholes.map(
					(blackhole) => new BlackHole(blackhole, blackhole.types)
				)
			);
	}

	toStringType(body: CelestialBody) {
		if (body instanceof Star) return "stars";
		if (body instanceof Planet) return "planets";
		if (body instanceof Moon) return "moons";
		if (body instanceof BlackHole) return "blackholes";
		return "planets";
	}
	downloadSolarSystem() {
		const data: SystemData = {
			stars: [],
			planets: [],
			moons: [],
			blackholes: [],
		};
		this.bodies.forEach(
			({ name, color, mass, radius, types, position, velocity }, i) => {
				data[this.toStringType(this.bodies[i])].push({
					name,
					color,
					mass,
					radius,
					types,
					position: [position.x, position.y],
					velocity: [velocity.x, velocity.y],
				});
			}
		);
		return data;
	}

	download() {
		const data = this.downloadSolarSystem();
		const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "solarsystem.json";
		a.click();
		URL.revokeObjectURL(url);
	}
	selectPosition(name: string) {
		const body = this.bodies.find((body) => body.name === name);
		return body?.position || null;
	}
	selectBody(name: string) {
		return this.bodies.find((body) => body.name === name) || null;
	}
}
