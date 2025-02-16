import { CelestialBody } from "../container/CelestialBody.js";
import { Config } from "../config/config.js";
import { Physics } from "../components/Physics.js";
import { CelestialBodyData, MoonData } from "../utils/types.js";

export class Moon extends CelestialBody {
	constructor(body: MoonData, planet: CelestialBody) {
		super({
			...{
				position: [planet.position.x + body.orbitalDistance[0], planet.position.y + body.orbitalDistance[1]],
				velocity: [planet.velocity.x + body.orbitalVelocity[0], planet.velocity.y + body.orbitalVelocity[1]],
			},
			...body,
		} as CelestialBodyData);
	}

	update(bodies: CelestialBody[]): void {
		Physics.applyGravitationalForces(this, bodies, Config.MOON_SELFGRAVITY);
		Physics.updatePosition(this);
	}
}
