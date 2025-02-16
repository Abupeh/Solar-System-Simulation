import { CelestialBody } from "../container/CelestialBody.js";
import { Physics } from "../components/Physics.js";
import { Config } from "../config/config.js";
export class Planet extends CelestialBody {
    moons = [];
    constructor(body) {
        super(body);
    }
    update(bodies) {
        Physics.applyGravitationalForces(this, bodies, Config.PLANET_SELFGRAVITY);
        Physics.updatePosition(this);
    }
}
