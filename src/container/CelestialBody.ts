import { Vector } from "../components/Vector.js";
import { CelestialBodyData } from "../utils/types.js";

export abstract class CelestialBody {
	public position!: Vector;
	public velocity!: Vector;
	public acceleration = new Vector([0, 0]);
	public name!: string;
	public mass!: number;
	public radius!: number;
	public color!: string;

	public trail: number[][] = [];
	public push: number = 0;

	constructor(body: CelestialBodyData) {
		body.position = new Vector(body.position);
		body.velocity = new Vector(body.velocity);

		Object.assign(this, body);
	}

	abstract update(bodies: CelestialBody[]): void;
}
