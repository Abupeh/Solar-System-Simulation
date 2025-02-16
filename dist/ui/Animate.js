import { Vector } from "../components/Vector";
import { Config } from "../config/config";
export class Animation {
    static animate(body, ctx, offsetX, offsetY) {
        ctx.save();
        ctx.translate(offsetX, offsetY);
        // Draw trail
        if (body.trail.length > 0) {
            ctx.beginPath();
            ctx.moveTo(body.trail[0].x, body.trail[0].y);
            for (const point of body.trail) {
                ctx.lineTo(point.x, point.y);
            }
            ctx.strokeStyle = body.color + "55";
            ctx.lineWidth = body.radius / 4;
            ctx.stroke();
        }
        // Draw body
        const gradient = ctx.createRadialGradient(body.position.x, body.position.y, 0, body.position.x, body.position.y, body.radius);
        gradient.addColorStop(0, body.color);
        gradient.addColorStop(1, body.color + "88");
        ctx.beginPath();
        ctx.arc(body.position.x, body.position.y, body.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        // Update trail
        body.trail.push(new Vector([body.position.x, body.position.y]));
        if (body.trail.length > Config.TRAIL_LENGTH) {
            body.trail.shift();
        }
        ctx.restore();
    }
}
