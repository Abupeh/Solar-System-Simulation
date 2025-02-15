import { Vector } from "./Vector.js";
import { Config } from "./config/config.js";
export class CelestialBody {
    mass;
    radius;
    color;
    position;
    velocity;
    acceleration;
    trail = [];
    constructor(mass, radius, color, initialPosition = new Vector([0, 0]), initialVelocity = new Vector([0, 0])) {
        this.mass = mass;
        this.radius = radius;
        this.color = color;
        this.position = initialPosition;
        this.velocity = initialVelocity;
        this.acceleration = new Vector([0, 0]);
    }
    draw(ctx, offsetX, offsetY) {
        ctx.save();
        ctx.translate(offsetX, offsetY);
        // Draw trail
        if (this.trail.length > 0) {
            ctx.beginPath();
            ctx.moveTo(this.trail[0].x, this.trail[0].y);
            for (const point of this.trail) {
                ctx.lineTo(point.x, point.y);
            }
            ctx.strokeStyle = this.color + "55";
            ctx.lineWidth = this.radius / 4;
            ctx.stroke();
        }
        // Draw body
        const gradient = ctx.createRadialGradient(this.position.x, this.position.y, 0, this.position.x, this.position.y, this.radius);
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, this.color + "88");
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        // Update trail
        this.trail.push(new Vector([this.position.x, this.position.y]));
        if (this.trail.length > Config.TRAIL_LENGTH) {
            this.trail.shift();
        }
        ctx.restore();
    }
}
