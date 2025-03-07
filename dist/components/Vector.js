export class Vector {
    x;
    y;
    constructor(position) {
        if (position instanceof Vector)
            [this.x, this.y] = [position.x, position.y];
        else
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
    invScale(scalar) {
        return new Vector([this.x / scalar, this.y / scalar]);
    }
    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    normalize() {
        const mag = this.magnitude();
        return mag > 0 ? this.scale(1 / mag) : new Vector([0, 0]);
    }
}
