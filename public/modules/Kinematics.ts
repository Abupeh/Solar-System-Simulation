import { AstroObject } from "../components/astro/AstroObject.js";
import { Vector } from "./Vector.js";

export class Kinematics {
	static GRAVITATIONAL_CONSTANT = 0.0087;
	static FORCE_AMPLITUDE = 10;
	static VELOCITY_AMPLITUDE = 20;

	constructor(
		public position = new Vector(0, 0),
		public velocity = new Vector(0, 0)
	) {}

	applyGravitationalForce(astroObjects: AstroObject[], thisObject: AstroObject) {
		let surfaceTemperature = 0;
		for (const { kinematics, properties } of astroObjects) {
			if (this == kinematics) continue;
			const distance = Vector.distance(kinematics.position, this.position);
			const force = Vector.normalize(distance);
			force
				.scale(
					Kinematics.GRAVITATIONAL_CONSTANT *
						thisObject.properties.mass *
						properties.mass *
						properties.gravity
				)
				.scale(1 / distance.magnitude)
				.scale(1 / thisObject.properties.mass)
				.scale(Kinematics.FORCE_AMPLITUDE);

			this.velocity.add(force);
			thisObject.properties.spin -= (force.x + force.y) * thisObject.properties.density;

			surfaceTemperature +=
				properties.luminosity /
				(distance.magnitude / thisObject.properties.radius ** 2);

			surfaceTemperature +=
				(properties.magneticField * thisObject.properties.metallicity) /
				(distance.magnitude /
					thisObject.properties.radius ** 2 /
					Kinematics.GRAVITATIONAL_CONSTANT);
		}

		thisObject.properties.coreTemperature +=
			(-thisObject.properties.coreTemperature +
				(thisObject.properties.charge / thisObject.properties.radius) *
					thisObject.properties.nucleusSize) /
			2;

		thisObject.properties.surfaceTemperature +=
			(-thisObject.properties.surfaceTemperature +
				thisObject.properties.coreTemperature +
				surfaceTemperature -
				thisObject.properties.atmosphere.pressure * thisObject.properties.density) /
			2;
		thisObject.properties.density +=
			(-thisObject.properties.density +
				((thisObject.properties.mass / thisObject.properties.radius) * 100) / 100) /
			2;

		if (thisObject.properties.spin > 360) thisObject.properties.spin = 0;
		if (thisObject.properties.spin < 0) thisObject.properties.spin = 360;
	}

	applyPositionalForce() {
		const velocity = Vector.amplitude(
			this.velocity,
			Kinematics.VELOCITY_AMPLITUDE
		);
		this.position.add(velocity);
	}
}
