import { Vector } from "./Vector.js";
import { CelestialBody } from "../container/CelestialBody.js";
import { Config } from "../config/config.js";

export class Physics {
	static applyGravitationalForces(body: CelestialBody, bodies: CelestialBody[]) {
		let velocity = new Vector(body.velocity);
		for (const otherBody of bodies) {
			if (otherBody !== body) {
				const distanceVector = otherBody.position.subtract(body.position);
				const sqrtDistance = distanceVector.magnitude();
				const forceDirection = distanceVector.normalize();
				const force = forceDirection
					.scale(Config.GRAVITATIONAL_CONSTANT * body.mass * otherBody.mass)
					.invScale(sqrtDistance);
				const acceleration = force.invScale(body.mass);
				velocity = velocity.add(acceleration.scale(Config.FORCE_AMPLITUDE));
			}
		}

		return velocity;
	}

	static updatePosition(body: CelestialBody) {
		let position = new Vector(body.position);
		position = position.add(body.velocity.scale(Config.FORCE_AMPLITUDE));
		return position;
	}
}
