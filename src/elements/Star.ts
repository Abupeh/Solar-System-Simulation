import { Config } from "../config/config.js";
import { CelestialBody } from "../container/CelestialBody.js";
import { CelestialBodyData, CelestialBodyString } from "../utils/types.js";

export class Star extends CelestialBody {
	static name = "Star" as CelestialBodyString;

	astroids: CelestialBody[] = [];

	constructor(body: CelestialBodyData, types?: string[]) {
		super(body, types);

		if (this.hasQuality("Giant")) {
			this.mass *= Config.GIANT_RADIUS;
			this.radius *= Config.GIANT_RADIUS;
		}

		if (this.hasQuality("Neutron")) {
			this.mass *= Config.NEUTRON_MASS;
			this.radius *= Config.NEUTRON_RADIUS;
		}

		if (this.hasQuality("SuperGiant")) {
			this.mass *= this.radius * Config.SUPERGIANT_RATIO;
		}

		if(this.hasQuality('HyperGiant')) {
			this.mass *= Config.HYPERGIANT_MASS
			this.radius *= Config.HYPERGIANT_RADIUS
		}
	}

	static placeConfig = {
		mass: 15000,
		radius: 10000,
		color: "#FFFAA0",
		velocity: [0, 0],
	} as CelestialBodyData;

	static qualities = {};

	static types = [
		"Dwarf",
		"Giant",
		"Neutron",
		"SuperGiant",
		"HyperGiant",
	] as const;
	hasQuality(type: (typeof Star.types)[number]) {
		return this.types.includes(type);
	}
}
