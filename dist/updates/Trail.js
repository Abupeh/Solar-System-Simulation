import { Display } from "../core/Display.js";
export class Trail {
    display;
    static TRAIL_LENGTH = 150;
    static TRAIL_WIDTH = 2;
    static MAX_TRAIL_WIDTH = 20;
    static TRAIL_ZOOM_QUALITY = 0.2;
    static REVERSAL_TRAIL = 255;
    static BRIGHTNESS = 2;
    constructor(display) {
        this.display = display;
    }
    updateTrail(astroObject) {
        if (astroObject.trail.length > Trail.TRAIL_LENGTH)
            astroObject.trail.shift();
        astroObject.trail.push([
            astroObject.kinematics.position.x,
            astroObject.kinematics.position.y,
        ]);
    }
    draw({ trail, radius, color }) {
        if (trail.length < 1)
            return;
        const trailSize = radius / Trail.TRAIL_WIDTH;
        this.display.ctx.lineWidth =
            trailSize > Trail.MAX_TRAIL_WIDTH ? Trail.MAX_TRAIL_WIDTH : trailSize;
        this.display.ctx.lineWidth *=
            (1 / this.display.camera.zoom) * Trail.TRAIL_ZOOM_QUALITY;
        for (let i = 0; i < trail.length - 1; i++) {
            this.display.ctx.beginPath();
            const alpha = Math.floor((i / trail.length) * Trail.BRIGHTNESS * 255);
            this.display.ctx.strokeStyle = color + Display.ToHex(alpha);
            this.display.ctx.moveTo(trail[i][0], trail[i][1]);
            this.display.ctx.lineTo(trail[i + 1][0], trail[i + 1][1]);
            this.display.ctx.stroke();
        }
    }
}
