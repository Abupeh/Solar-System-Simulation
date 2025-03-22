import { Vector } from "./Vector.js";
export class Kinematics {
    position;
    velocity;
    static GRAVITATIONAL_CONSTANT = 0.0087;
    static FORCE_AMPLITUDE = 10;
    static VELOCITY_AMPLITUDE = 20;
    constructor(position = new Vector(0, 0, { position: true }), velocity = new Vector(0, 0, { velocity: true })) {
        this.position = position;
        this.velocity = velocity;
    }
    applyGravitationalForce(astroObjects, gravity, mass) {
        for (const { kinematics, mass: astroMass } of astroObjects) {
            if (this == kinematics)
                continue;
            const distance = Vector.distance(kinematics.position, this.position);
            const force = Vector.normalize(distance);
            force
                .scale(Kinematics.GRAVITATIONAL_CONSTANT * mass * astroMass * gravity)
                .scale(1 / distance.magnitude)
                .scale(1 / mass)
                .scale(Kinematics.FORCE_AMPLITUDE);
            this.velocity.add(force);
        }
    }
    applyPositionalForce() {
        const velocity = Vector.amplitude(this.velocity, Kinematics.VELOCITY_AMPLITUDE);
        this.position.add(velocity);
    }
}
