import { CelestialBody } from "../CelestialBody.js";
import { Physics } from "../Physics.js";
export class Moon extends CelestialBody {
    constructor(mass, radius, color, initialPosition, initialVelocity) {
        super(mass, radius, color, initialPosition, initialVelocity);
    }
    update(bodies) {
        Physics.applyGravitationalForces(this, bodies);
        Physics.updatePosition(this);
    }
}
