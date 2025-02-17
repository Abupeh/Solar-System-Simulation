import { Vector } from "../components/Vector.js";
export class CelestialBody {
    position;
    velocity;
    acceleration = new Vector([0, 0]);
    name;
    mass;
    radius;
    color;
    trail = [];
    push = 0;
    constructor(body) {
        body.position = new Vector(body.position);
        body.velocity = new Vector(body.velocity);
        Object.assign(this, body);
    }
}
