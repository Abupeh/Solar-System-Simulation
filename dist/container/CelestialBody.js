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
    types = [];
    trail = [];
    constructor(body, types) {
        this.types = types || [];
        body.position = new Vector(body.position);
        body.velocity = new Vector(body.velocity);
        Object.assign(this, body);
        if (this.hasQuality("Dwarf")) {
            this.radius *= Config.DWARF_RADIUS;
            this.mass *= Config.DWARF_MASS;
        }
    }
    hasQuality(type) {
        return this.types.includes(type);
    }
    updateVelocities(bodies) {
        return Physics.applyGravitationalForces(this, bodies);
    }
    updatePositions() {
        return Physics.updatePosition(this);
    }
    reversalTrail = false;
    updateTrail(reversal = false, followingBody = null, previousBody, referenceMode = false) {
        this.reversalTrail = reversal;
        if (referenceMode && followingBody)
            this.trail.forEach((trailpiece) => {
                trailpiece[0] += followingBody.position.x - previousBody[0];
                trailpiece[1] += followingBody.position.y - previousBody[1];
            });
        if (referenceMode &&
            followingBody?.position.x == this.position.x &&
            followingBody?.position.y == this.position.y)
            return;
        this.trail.push([this.position.x, this.position.y]);
        if (!this.reversalTrail)
            if (this.trail.length > Config.TRAIL_LENGTH)
                this.trail.shift();
    }
}
