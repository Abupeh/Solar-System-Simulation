import { CelestialBody } from "../CelestialBody.js";
import { Physics } from "../Physics.js";
import { Config } from "../config/config.js";
export class Planet extends CelestialBody {
    moons = [];
    constructor(mass, radius, color, initialPosition, initialVelocity) {
        super(mass, radius, color, initialPosition, initialVelocity);
    }
    update(bodies) {
        Physics.applyGravitationalForces(this, bodies, Config.PLANET_SELFGRAVITY);
        Physics.updatePosition(this);
    }
}
