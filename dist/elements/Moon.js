import { CelestialBody } from "../container/CelestialBody.js";
import { Config } from "../config/config.js";
import { Physics } from "../components/Physics.js";
import { Vector } from "../components/Vector.js";
export class Moon extends CelestialBody {
    constructor(body, planet) {
        body.orbitalDistance =
            body.orbitalVelocity =
                super({
                    ...body,
                    position: new Vector(body.orbitalDistance).add(planet.position),
                    velocity: new Vector(body.orbitalVelocity).add(planet.velocity),
                });
    }
    update(bodies) {
        Physics.applyGravitationalForces(this, bodies, Config.MOON_SELFGRAVITY);
        Physics.updatePosition(this);
    }
}
