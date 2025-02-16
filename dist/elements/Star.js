import { CelestialBody } from "../container/CelestialBody.js";
import { Physics } from "../components/Physics.js";
import { Config } from "../config/config.js";
export class Star extends CelestialBody {
    astroids = [];
    constructor(body) {
        super(body);
    }
    update(bodies) {
        Physics.applyGravitationalForces(this, bodies, Config.STAR_SELFGRAVITY);
        Physics.updatePosition(this);
    }
}
