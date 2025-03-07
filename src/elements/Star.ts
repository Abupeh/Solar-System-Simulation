import { CelestialBody } from "../container/CelestialBody.js";
import { CelestialBodyData, CelestialBodyString } from "../utils/types.js";

export class Star extends CelestialBody {
	static name = "Star" as CelestialBodyString

	astroids: CelestialBody[] = [];

	constructor(body: CelestialBodyData, types?: string[]) {
		super(body, types);
	}

	
	static placeConfig = {
		mass: 15000,
		radius: 10000,
		color: "#FFFAA0",
		velocity: [0, 0],
	} as CelestialBodyData;

	static qualities = {

	}

	static types = ["Dwarf", "Giant", "Neutron", "SuperGiant", "HyperGiant"]
	hasQuality(type: typeof Star.types[number]) {
		return this.currentTypes.includes(type)
	}
}
