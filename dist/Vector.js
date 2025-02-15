export class Vector {
    position;
    x;
    y;
    creation = false;
    constructor(position) {
        this.position = position;
        [this.x, this.y] = position;
    }
    add(v) {
        return new Vector([this.x + v.x, this.y + v.y]);
    }
    subtract(v) {
        return new Vector([this.x - v.x, this.y - v.y]);
    }
    scale(scalar) {
        return new Vector([this.x * scalar, this.y * scalar]);
    }
    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    normalize() {
        const mag = this.magnitude();
        return mag > 0 ? this.scale(1 / mag) : new Vector([0, 0]);
    }
    static gravitationalForce(a, b, massA, massB, G) {
        const delta = b.subtract(a);
        const distance = delta.magnitude();
        const forceMagnitude = (G * massA * massB) / (distance * distance);
        return delta.normalize().scale(forceMagnitude);
    }
}
