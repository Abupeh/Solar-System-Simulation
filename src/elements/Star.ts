import { CelestialBody } from "../container/CelestialBody.js";
import { CelestialBodyData } from "../utils/types.js";

export class Star extends CelestialBody {
	astroids: CelestialBody[] = [];

	constructor(body: CelestialBodyData) {
		super(body);
	}
}
