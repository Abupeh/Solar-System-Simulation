import { Config } from "../config/config.js";
export class Physics {
    static applyGravitationalForces(body, bodies, application = 1) {
        for (const otherBody of bodies) {
            if (otherBody !== body) {
                const distanceVector = otherBody.position.subtract(body.position);
                const distance = distanceVector.magnitude();
                const forceMagnitude = (Config.GRAVITATIONAL_CONSTANT * body.mass * otherBody.mass) /
                    (distance * distance + Config.FORCE_MAGNITUDE);
                const force = distanceVector.normalize().scale(forceMagnitude);
                totalForce = totalForce.add(force);
            }
        }
        body.acceleration = totalForce.scale(1 / body.mass);
        body.acceleration = body.acceleration.scale(application);
    }
    static updatePosition(body) {
        body.velocity = body.velocity.add(body.acceleration.scale(Config.TIME_STEP));
        body.position = body.position.add(body.velocity.scale(Config.TIME_STEP));
    }
}
