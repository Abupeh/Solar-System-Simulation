export class Vector {
	public x: number;
	public y: number;
	constructor(position: [number, number] | Vector) {
		if (position instanceof Vector) [this.x, this.y] = [position.x, position.y];
		else [this.x, this.y] = position;
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

	invScale(scalar: number): Vector {
		return new Vector([this.x / scalar, this.y / scalar]);
	}

	magnitude(): number {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

	normalize(): Vector {
		const mag = this.magnitude();
		return mag > 0 ? this.scale(1 / mag) : new Vector([0, 0]);
	}
}
