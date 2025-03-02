import { Vector } from "./Vector.js";
import { CelestialBody } from "../container/CelestialBody.js";
import { Config } from "../config/config.js";

export class Physics {
    static applyGravitationalForces(
        body: CelestialBody,
        bodies: CelestialBody[],
    ): void {
        for (const otherBody of bodies) {
            if (otherBody !== body) {
                const distanceVector = otherBody.position.subtract(body.position);
                const sqrtDistance = distanceVector.magnitude();
                const forceDirection = distanceVector.normalize();
                const force = forceDirection.scale(Config.GRAVITATIONAL_CONSTANT * body.mass * otherBody.mass).invScale( sqrtDistance)
                const acceleration = force.invScale(body.mass);
                body.velocity = body.velocity.add(acceleration.scale(Config.TIME_STEP));
            }
        }
    }

    static updatePosition(body: CelestialBody): void {
        body.position = body.position.add(body.velocity.scale(Config.TIME_STEP));
    }
}
