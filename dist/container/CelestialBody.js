import { Physics } from "../components/Physics.js";
import { Vector } from "../components/Vector.js";
import { Config } from "../config/config.js";
export class CelestialBody {
    position;
    velocity;
    acceleration = new Vector([0, 0]);
    name;
    mass;
    radius;
    color;
    currentTypes = [];
    trail = [];
    constructor(body, types) {
        this.currentTypes = types || [];
        body.position = new Vector(body.position);
        body.velocity = new Vector(body.velocity);
        console.log('new body', this.hasQuality('Dwarf'));
        Object.assign(this, body);
        if (this.hasQuality("Dwarf")) {
            this.radius *= Config.DWARF_RADIUS;
            this.mass *= Config.DWARF_MASS;
        }
    }
    hasQuality(type) {
        return this.currentTypes.includes(type);
    }
    updateVelocities(bodies) {
        return Physics.applyGravitationalForces(this, bodies);
    }
    updatePositions() {
        return Physics.updatePosition(this);
    }
    reversalTrail = false;
    updateTrail(reversal = false) {
        if (reversal) {
            this.reversalTrail = true;
            return this.trail.push([this.position.x, this.position.y]);
        }
        this.reversalTrail = false;
        this.trail.push([this.position.x, this.position.y]);
        if (this.trail.length > Config.TRAIL_LENGTH)
            this.trail.shift();
    }
}
