import { CelestialBody } from "../CelestialBody.js";
import { Config } from "../config/config.js";
import { Physics } from "../Physics.js";
import { Vector } from "../Vector.js";

export class Moon extends CelestialBody {
	constructor(
		mass: number,
		radius: number,
		color: string,
		initialPosition: Vector,
		initialVelocity: Vector
	) {
		super(mass, radius, color, initialPosition, initialVelocity);
	}

	update(bodies: CelestialBody[]): void {
		Physics.applyGravitationalForces(this, bodies, Config.MOON_SELFGRAVITY);
		Physics.updatePosition(this);
	}
}
