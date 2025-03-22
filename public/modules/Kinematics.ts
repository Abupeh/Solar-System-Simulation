import { AstroObject } from "../components/astro/AstroObject.js";
import { Vector } from "./Vector.js";

export class Kinematics {
	static GRAVITATIONAL_CONSTANT = 0.0087;
	static FORCE_AMPLITUDE = 10;
	static VELOCITY_AMPLITUDE = 20;

	constructor(
		public position = new Vector(0, 0, { position: true }),
		public velocity = new Vector(0, 0, { velocity: true })
	) {}

	applyGravitationalForce(
		astroObjects: AstroObject[],
		gravity: number,
		mass: number
	) {
		for (const { kinematics, mass: astroMass } of astroObjects) {
			if (this == kinematics) continue;
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
		const velocity = Vector.amplitude(
			this.velocity,
			Kinematics.VELOCITY_AMPLITUDE
		);
		this.position.add(velocity);
	}
}
