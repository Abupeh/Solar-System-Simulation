import { Config } from "./config/config.js";
export class Vector {
	public x: number;
	public y: number;
	public creation = false;
	constructor(public position: [number, number]) {
		[this.x, this.y] = position;
	}

	add(v: Vector): Vector {
		return new Vector([this.x + v.x, this.y + v.y]);
	}

	subtract(v: Vector): Vector {
		return new Vector([this.x - v.x, this.y - v.y]);
	}

	scale(scalar: number): Vector {
		return new Vector([this.x * scalar, this.y * scalar]);
	}

	magnitude(): number {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

	normalize(): Vector {
		const mag = this.magnitude();
		return mag > 0 ? this.scale(1 / mag) : new Vector([0, 0]);
	}

	static gravitationalForce(
		a: Vector,
		b: Vector,
		massA: number,
		massB: number,
		G: number
	): Vector {
		const delta = b.subtract(a);
		const distance = delta.magnitude();
		const forceMagnitude = (G * massA * massB) / (distance * distance);
		return delta.normalize().scale(forceMagnitude);
	}
}
