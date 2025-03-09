import { CelestialBody } from "../container/CelestialBody.js";
import { Moon } from "./Moon.js";
import { CelestialBodyData, CelestialBodyString } from "../utils/types.js";
import { Physics } from "../components/Physics.js";
import { Config } from "../config/config.js";
import { Color } from "../utils/Color.js";

export class Planet extends CelestialBody {
	static name = "Planet" as CelestialBodyString;
	moons: Moon[] = [];

	constructor(body: CelestialBodyData, types?: string[]) {
		super(body, types);

		if (this.hasQuality("Giant")) {
			this.mass *= Config.GIANT_RADIUS;
			this.radius *= Config.GIANT_RADIUS;
		}

		if (this.hasQuality("Gas")) {
			this.mass *= Config.GAS_MASS;
		}

		if(this.hasQuality('Super-Earth')) {
			this.mass *= this.radius * Config.SUPER_EARTH_RATIO
		}

		if (this.hasQuality("Terrestrial")) {
			this.mass *= Config.TERRESTRIAL_MASS;
		}
	}

	static placeConfig = {
		mass: 1500,
		radius: 1000,
		color: Color.RandomColor(),
		velocity: [0, 0],
	} as CelestialBodyData;

	static types = [
		"Dwarf",
		"Gas",
		"Ice",
		"Giant",
		"Super-Earth",
		"Terrestrial",
	] as const;
	static qualities = {};

	hasQuality(type: (typeof Planet.types)[number]) {
		return this.types.includes(type);
	}
}
