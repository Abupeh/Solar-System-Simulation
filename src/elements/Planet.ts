import { CelestialBody } from "../container/CelestialBody.js";
import { Moon } from "./Moon.js";
import { Physics } from "../components/Physics.js";
import { Config } from "../config/config.js";
import { CelestialBodyData } from "../utils/types.js";

export class Planet extends CelestialBody {
	moons: Moon[] = [];

    constructor(body: CelestialBodyData) {
        super(body);
    }

	update(bodies: CelestialBody[]): void {
		Physics.applyGravitationalForces(this, bodies, Config.PLANET_SELFGRAVITY);
		Physics.updatePosition(this);
	}
}
