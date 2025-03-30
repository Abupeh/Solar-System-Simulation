import { AstroObject } from "../../components/astro/AstroObject.js";
import { Global } from "../../global/Global.js";

export class AstroObjectDisplay {
	static GRADIENT_FADE = "ff";
	static GRADIENT_EFFECT = "bb";
	static SHADOW_COLOR = "#ffffff";
	static SHADOW_BLUR = 0.5;

	constructor(private global: Global) {}
	draw(astroObject: AstroObject, zero = false, zeroRadius?: number) {
		const astroObjectDisplay = this.getFollowingPosition(
			astroObject,
			zero,
			zeroRadius
		);
		const gradient = this.createGradient(astroObjectDisplay);
		this.global.ctx.save();

		this.global.ctx.beginPath();
		this.renderBody(astroObjectDisplay, gradient);
		this.global.ctx.fill();
		this.global.ctx.restore();
	}

	getFollowingPosition(
		astroObject: AstroObject,
		zero: boolean,
		zeroRadius = astroObject.properties.radius,
		{ followingX, followingY } = this.global.tracker
	) {
		return {
			properties: {
				...astroObject.properties,
				radius: zeroRadius,
			},
			kinematics: {
				position: {
					x: zero ? 0 : followingX() + astroObject.kinematics.position.x,
					y: zero ? 0 : followingY() + astroObject.kinematics.position.y,
				},
			},
		} as AstroObject;
	}

	createGradient({
		kinematics: {
			position: { x, y },
		},
		properties: { radius, color },
	}: AstroObject) {
		const gradient = this.global.ctx.createRadialGradient(x, y, 0, x, y, radius);
		gradient.addColorStop(0, color + AstroObjectDisplay.GRADIENT_EFFECT);
		gradient.addColorStop(1, color + AstroObjectDisplay.GRADIENT_FADE);
		return gradient;
	}
	renderBody(
		{
			kinematics: {
				position: { x, y },
			},
			properties: { radius, luminosity },
		}: AstroObject,
		gradient: CanvasGradient
	) {
		this.global.ctx.arc(x, y, radius, 0, 2 * Math.PI);
		this.global.ctx.shadowColor = AstroObjectDisplay.SHADOW_COLOR;
		this.global.ctx.shadowBlur = luminosity;
		this.global.ctx.fillStyle = gradient;
	}
}
