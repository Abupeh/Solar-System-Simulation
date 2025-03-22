import { AstroObject } from "../../components/astro/AstroObject.js";
import { AstroSet } from "../../components/class/AstroSet.js";
import { Planet } from "../../components/templates/Planet.js";
import { Global } from "../../global/Global.js";

interface AstroDisplayProperties {
	x: number;
	y: number;
	radius: number;
	color: string;
	set: AstroSet<any>;
}
export class AstroObjectDisplay {
	static GRADIENT_FADE = "ff";
	static GRADIENT_EFFECT = "bb";
	static SHADOW_COLOR = "#ffffff";
	static SHADOW_BLUR = 0.5;

	constructor(private global: Global) {}
	draw(astroObject: AstroObject) {
		const astroObjectDisplay = this.getFollowingPosition(astroObject);
		const gradient = this.createGradient(astroObjectDisplay);
		this.global.ctx.beginPath();
		this.renderBody(astroObjectDisplay, gradient);
		this.global.ctx.fill();
	}

	getFollowingPosition(
		astroObject: AstroObject,
		{ followingX, followingY } = this.global.tracker
	) {
		return {
			...astroObject,
			x: followingX() + astroObject.kinematics.position.x,
			y: followingY() + astroObject.kinematics.position.y,
		} as AstroDisplayProperties;
	}

	createGradient({ x, y, radius, color }: AstroDisplayProperties) {
		const gradient = this.global.ctx.createRadialGradient(x, y, 0, x, y, radius);
		gradient.addColorStop(0, color + AstroObjectDisplay.GRADIENT_EFFECT);
		gradient.addColorStop(1, color + AstroObjectDisplay.GRADIENT_FADE);
		return gradient;
	}
	renderBody(
		{ x, y, radius, set }: AstroDisplayProperties,
		gradient: CanvasGradient
	) {
		this.global.ctx.arc(x, y, radius, 0, 2 * Math.PI);
		this.global.ctx.shadowColor = AstroObjectDisplay.SHADOW_COLOR;
		this.global.ctx.shadowBlur = AstroObjectDisplay.SHADOW_BLUR;
		this.global.ctx.fillStyle = gradient;
		if(set instanceof Planet && set.variables.rings.color === '#dddddd') this.global.ctx.fillStyle = '#ffffff'
	}
}
