import { AstroObject } from "../../components/astro/AstroObject.js";
import { Global } from "../../global/Global.js";

export class Trail {
	static TRAIL_LENGTH = 150;
	static TRAIL_WIDTH = 2;
	static MAX_TRAIL_WIDTH = 20;
	static TRAIL_ZOOM_QUALITY = 0.2;
	static REVERSAL_TRAIL = 255;
	static BRIGHTNESS = 2;

	constructor(private global: Global) {}
	updateTrail(
		astroObject: AstroObject,
		{ followingX, followingY } = this.global.tracker
	) {
		if (astroObject.trail.length > Trail.TRAIL_LENGTH) astroObject.trail.shift();

		astroObject.trail.push([
			astroObject.kinematics.position.x + followingX(),
			astroObject.kinematics.position.y + followingY(),
		]);
	}

	draw({ trail, properties: { radius, color, name } }: AstroObject) {
		if (trail.length < 1) return;
		const trailSize = radius / Trail.TRAIL_WIDTH;
		this.global.ctx.lineWidth =
			trailSize > Trail.MAX_TRAIL_WIDTH ? Trail.MAX_TRAIL_WIDTH : trailSize;
		this.global.ctx.lineWidth *=
			(1 / this.global.camera.zoom) * Trail.TRAIL_ZOOM_QUALITY;

		for (let i = 0; i < trail.length - 1; i++) {
			this.global.ctx.beginPath();
			const alpha = Math.floor((i / trail.length) * Trail.BRIGHTNESS * 255);
			this.global.ctx.strokeStyle = color + Global.ToHex(alpha);
			this.global.ctx.moveTo(trail[i][0], trail[i][1]);
			this.global.ctx.lineTo(trail[i + 1][0], trail[i + 1][1]);
			this.global.ctx.stroke();
		}
	}
}
