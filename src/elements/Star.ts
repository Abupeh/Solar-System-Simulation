import { CelestialBody } from "../container/CelestialBody.js";
import { Physics } from "../components/Physics.js";
import { Config } from "../config/config.js";
import { CelestialBodyData } from "../utils/types.js";

export class Star extends CelestialBody {
	astroids: CelestialBody[] = [];
	
	constructor(body: CelestialBodyData) {
		super(body);
	}

	update(bodies: CelestialBody[]): void {
		Physics.applyGravitationalForces(this, bodies, Config.STAR_SELFGRAVITY);
		Physics.updatePosition(this);
	}
}
