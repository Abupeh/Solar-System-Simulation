import { Vector } from "../components/Vector.js";
export class CelestialBody {
    position;
    velocity;
    acceleration;
    name;
    mass;
    radius;
    color;
    trail = [];
    push = 0;
    constructor(body) {
        this.name = body.name;
        this.mass = body.mass;
        this.radius = body.radius;
        this.color = body.color;
        this.position = new Vector(body.position);
        this.velocity = new Vector(body.velocity);
        this.acceleration = new Vector([0, 0]);
    }
}
