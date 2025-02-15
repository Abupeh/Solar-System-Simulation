import { CelestialBody } from "../CelestialBody.js";
import { Physics } from "../Physics.js";
import { Config } from "../config/config.js";
export class Star extends CelestialBody {
    constructor(mass, radius, color, initialPosition, initialVelocity) {
        super(mass, radius, color, initialPosition, initialVelocity);
    }
    update(bodies) {
        Physics.applyGravitationalForces(this, bodies, Config.STAR_SELFGRAVITY);
        Physics.updatePosition(this);
    }
}
