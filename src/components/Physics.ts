import { Vector } from "./Vector.js";
import { CelestialBody } from "../container/CelestialBody.js";
import { Config } from "../config/config.js";

export class Physics {
	static applyGravitationalForces(
		body: CelestialBody,
		bodies: CelestialBody[],
		application = 1
	): void {
		let totalForce = new Vector([0, 0]);

		for (const otherBody of bodies) {
			if (otherBody !== body) {
				const distanceVector = otherBody.position.subtract(body.position);
				const distance = distanceVector.magnitude();
				const forceMagnitude =
					(Config.GRAVITATIONAL_CONSTANT * body.mass * otherBody.mass) /
					(distance * distance + Config.FORCE_MAGNITUDE);
				const force = distanceVector.normalize().scale(forceMagnitude);
				totalForce = totalForce.add(force);
			}
		}

		body.acceleration = totalForce.scale(1 / body.mass);
		body.acceleration = body.acceleration.scale(application);
	}

	static updatePosition(body: CelestialBody): void {
		body.velocity = body.velocity.add(body.acceleration.scale(Config.TIME_STEP));
		body.position = body.position.add(body.velocity.scale(Config.TIME_STEP));
	}
}
