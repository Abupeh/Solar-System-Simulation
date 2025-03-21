import { Physics } from "../components/Physics.js";
import { Vector } from "../components/Vector.js";
import { Config } from "../config/config.js";
import { CelestialBodyData } from "../utils/types.js";
export abstract class CelestialBody {
	public position!: Vector;
	public velocity!: Vector;
	public acceleration = new Vector([0, 0]);
	public name!: string;
	public mass!: number;
	public radius!: number;
	public color!: string;
	public types: string[] = [];

	public trail: number[][] = [];

	constructor(body: CelestialBodyData, types?: string[]) {
		this.types = types || [];
		body.position = new Vector(body.position);
		body.velocity = new Vector(body.velocity);

		Object.assign(this, body);

		if (this.hasQuality("Dwarf")) {
			this.radius *= Config.DWARF_RADIUS;
			this.mass *= Config.DWARF_MASS;
		}
	}

	hasQuality(type: string) {
		return this.types.includes(type);
	}
	updateVelocities(bodies: CelestialBody[]) {
		return Physics.applyGravitationalForces(this, bodies);
	}
	updatePositions() {
		return Physics.updatePosition(this);
	}

	reversalTrail = false;
	updateTrail(
		reversal = false,
		followingBody: CelestialBody | null = null,
		previousBody?: [number, number],
		referenceMode = false
	) {
		this.reversalTrail = reversal;
		if (referenceMode && followingBody)
			this.trail.forEach((trailpiece) => {
				trailpiece[0] += followingBody.position.x - previousBody![0];
				trailpiece[1] += followingBody.position.y - previousBody![1];
			});

		if (
			referenceMode &&
			followingBody?.position.x == this.position.x &&
			followingBody?.position.y == this.position.y
		)
			return;
		this.trail.push([this.position.x, this.position.y]);

		if (!this.reversalTrail)
			if (this.trail.length > Config.TRAIL_LENGTH) this.trail.shift();
	}
}
