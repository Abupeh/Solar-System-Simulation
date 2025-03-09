import { CelestialBody } from "../container/CelestialBody.js";
import { CelestialBodyData, CelestialBodyString } from "../utils/types.js";

export class BlackHole extends CelestialBody {
	static name = "BlackHole" as CelestialBodyString;
	constructor(body: CelestialBodyData, types?: string[]) {
		super(body, types);
	}

	static placeConfig = {
		mass: 9999999,
		radius: 99999,
		color: "#010110",
		velocity: [0, 0],
	} as CelestialBodyData;

	static qualities = {};

	static types = [
		"Stellar",
		"Intermediate",
		"SuperMassive",
		"Primordial",
	] as const;
	hasQuality(type: (typeof BlackHole.types)[number]) {
		return this.types.includes(type);
	}
}
