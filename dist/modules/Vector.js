export class Vector {
    static distance(vectorA, vectorB) {
        return new Vector(vectorA.x - vectorB.x, vectorA.y - vectorB.y);
    }
    static sum(vectorA, vectorB) {
        return new Vector(vectorA.x + vectorB.x, vectorA.y + vectorB.y);
    }
    static normalize(vector) {
        const mag = vector.magnitude;
        return mag > 0
            ? new Vector(vector.x / mag, vector.y / mag)
            : new Vector(0, 0);
    }
    static amplitude(vector, scalar) {
        return new Vector(vector.x * scalar, vector.y * scalar);
    }
    x;
    y;
    constructor(x, y, name = {}) {
        Object.assign(this, name);
        this.x = x;
        this.y = y;
    }
    add(v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }
    subtract(v) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }
    scale(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }
    get magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
}
