import { Vector } from "../components/Vector.js";
import { CelestialBodyData } from "../utils/types.js";

export abstract class CelestialBody {
	position: Vector;
	velocity: Vector;
	acceleration: Vector;
	public name: string;
	public mass: number;
	public radius: number;
	public color: string;
	public trail: number[][] = [];
	public push: number = 0;

	constructor(body: CelestialBodyData) {
		this.name = body.name;
		this.mass = body.mass;
		this.radius = body.radius;
		this.color = body.color;

		this.position = new Vector(body.position);
		this.velocity = new Vector(body.velocity);
		this.acceleration = new Vector([0, 0]);
	}

	abstract update(bodies: CelestialBody[]): void;
}
