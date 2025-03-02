import { CelestialBody } from "../container/CelestialBody.js";
import { Vector } from "../components/Vector.js";
export class Moon extends CelestialBody {
    constructor(body, planet) {
        if (!planet) {
            super(body);
            return;
        }
        const moonbody = body;
        const planetbody = planet;
        super({
            ...body,
            position: new Vector(moonbody.orbitalDistance).add(planetbody.position),
            velocity: new Vector(moonbody.orbitalVelocity).add(planetbody.velocity),
        });
    }
}
