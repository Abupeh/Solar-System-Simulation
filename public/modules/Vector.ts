export class Vector {
	static distance(vectorA: Vector, vectorB: Vector) {
		return new Vector(vectorA.x - vectorB.x, vectorA.y - vectorB.y);
	}

	static sum(vectorA: Vector, vectorB: Vector) {
		return new Vector(vectorA.x + vectorB.x, vectorA.y + vectorB.y)
	}

	static normalize(vector: Vector) {
		const mag = vector.magnitude;
		return mag > 0
			? new Vector(vector.x / mag, vector.y / mag)
			: new Vector(0, 0);
	}

	static amplitude(vector: Vector, scalar: number) {
		return new Vector(vector.x * scalar, vector.y * scalar)
	}
	constructor(public x: number, public y: number) {}
	add(v: Vector) {
		this.x += v.x;
		this.y += v.y;
		return this;
	}
	subtract(v: Vector) {
		this.x -= v.x;
		this.y -= v.y;
		return this;
	}
	scale(scalar: number) {
		this.x *= scalar;
		this.y *= scalar;
		return this;
	}
	get magnitude(): number {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
}
