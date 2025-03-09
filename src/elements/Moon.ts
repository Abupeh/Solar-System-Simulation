import { CelestialBody } from "../container/CelestialBody.js";
import { CelestialBodyData, CelestialBodyString } from "../utils/types.js";
import { Vector } from "../components/Vector.js";

export class Moon extends CelestialBody {
	static name = "Moon" as CelestialBodyString;

	constructor(body: CelestialBodyData, types?: string[]) {
		super(body, types);
	}

	static placeConfig = {
		mass: 500,
		radius: 300,
		color: "#c9c9c9",
		velocity: [0, 0],
	} as CelestialBodyData;
	static qualities = {};

	static types = ["Dwarf"] as const;

	hasQuality(type: (typeof Moon.types)[number]) {
		return this.types.includes(type);
	}
}
