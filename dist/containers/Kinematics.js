import { Vector } from "./Vector.js";
export class Kinematics {
    mass;
    position;
    velocity;
    static GRAVITATIONAL_CONSTANT = 0.0087;
    static FORCE_AMPLITUDE = 10;
    static VELOCITY_AMPLITUDE = 20;
    constructor(mass = 1, position = new Vector(0, 0), velocity = new Vector(0, 0)) {
        this.mass = mass;
        this.position = position;
        this.velocity = velocity;
    }
    applyGravitationalForce(astroObjects, gravity) {
        for (const { kinematics } of astroObjects) {
            if (this == kinematics)
                continue;
            const distance = Vector.distance(kinematics.position, this.position);
            const force = Vector.normalize(distance);
            force
                .scale(Kinematics.GRAVITATIONAL_CONSTANT * this.mass * kinematics.mass * gravity)
                .scale(1 / distance.magnitude)
                .scale(1 / this.mass)
                .scale(Kinematics.FORCE_AMPLITUDE);
            this.velocity.add(force);
        }
    }
    applyPositionalForce() {
        const velocity = Vector.amplitude(this.velocity, Kinematics.VELOCITY_AMPLITUDE);
        this.position.add(velocity);
    }
}
