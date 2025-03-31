import { AstroObject } from "../../components/astro/AstroObject.js";
import { Global } from "../../global/Global.js";
import { GuiElement } from "../../layout/class/GuiElement.js";

export class AstroObjectDisplay {
	static GRADIENT_FADE = "bb";
	static GRADIENT_EFFECT = "dd";
	static SHADOW_COLOR = "#ffffff";
	static SHADOW_BLUR = 0.5;

	static textColor = "#ffffff";
	static textOffset = 1.5;
	static ZOOM_QUALITY = 0.1;

	static atmosphericColor = {
		N2: "#ADD8E6",
		O2: "#90EE90",
	};
	static ringColor = {
		Ice: "#b9e8ea",
		Rock: "#C19D74",
		Dust: "#CCB998",
	};

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
		this.renderText(astroObjectDisplay, zero);
		this.renderBody(astroObjectDisplay, zero, gradient);
		this.global.ctx.fill();
		this.renderRing(astroObjectDisplay, astroObject.properties.radius, zero);
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
		gradient.addColorStop(0, color + AstroObjectDisplay.GRADIENT_FADE);
		gradient.addColorStop(1, color + AstroObjectDisplay.GRADIENT_EFFECT);
		return gradient;
	}

	renderText(
		{
			kinematics: {
				position: { x, y },
			},
			properties: { radius, name },
		}: AstroObject,
		zero = false
	) {
		if (!zero)
			this.global.ctx.font = `${
				(radius / this.global.camera.zoom) * AstroObjectDisplay.ZOOM_QUALITY
			}px ${GuiElement.font}`;
		this.global.ctx.fillStyle = "#ffffff";
		const offset = AstroObjectDisplay.textOffset * radius;
		this.global.ctx.fillText(name, x, y + (zero ? -offset : offset));
	}

	renderRing(
		{
			kinematics: {
				position: { x, y },
			},
			properties: {
				luminosity,
				radius,
				rings: {
					rings,
					color,
					distance,
					thickness,
					composition,
					tiers,
					tierPartition,
				},
				spin,
			},
		}: AstroObject,
		originalRadius: number,
		zero = false
	) {
		if (!rings) return;
		this.global.ctx.save();
		this.global.ctx.translate(x, y);

		for (let i = 0; i < tiers; i++) {
			const tierRotation = (i + 1) / 10;
			const rotation = spin * Math.PI * tierRotation;
			if (zero) this.global.ctx.rotate((Math.PI / 2.5) * (i + 1));
			else this.global.ctx.rotate(rotation / 180);
			this.global.ctx.beginPath();

			const partitionRadius = radius * (tierPartition * i + 1);
			const zeroThickness = thickness * (partitionRadius / originalRadius);
			const partitionThickness = zeroThickness / (tierPartition * i + 1);
			const zeroDistance = distance * (radius / originalRadius);
			
			const seperation = zeroDistance * tierPartition * (i + 1);

			const innerRadius = partitionRadius + seperation;
			const outerRadius = partitionThickness + innerRadius;

			let radiusX = innerRadius - (radius + zeroThickness)
			if(radiusX < 0) radiusX = 0;
			this.global.ctx.ellipse(
				0,
				0,
				radiusX,
				innerRadius + partitionThickness / 2,
				0,
				0,
				Math.PI * 2
			);
			let outerRadiusX = outerRadius - (radius + zeroThickness)
			if(outerRadiusX < 0) outerRadiusX = 0;
			this.global.ctx.ellipse(
				0,
				0,
				outerRadiusX,
				outerRadius + partitionThickness * 2,
				0,
				0,
				Math.PI * 2,
				true
			);
			this.global.ctx.closePath();

			const ringGradient = this.createCompositionalGradient(
				0,
				0,
				outerRadius,
				color,
				composition,
				AstroObjectDisplay.ringColor
			);
			this.global.ctx.fillStyle = ringGradient;
			this.global.ctx.fill();
		}
		this.global.ctx.restore();
	}
	renderBody(
		{
			kinematics: {
				position: { x, y },
			},
			properties: {
				radius,
				luminosity,
				atmosphere: { atmosphere, color, composition },
			},
		}: AstroObject,
		zero = false,
		gradient: CanvasGradient
	) {
		this.global.ctx.arc(x, y, radius, 0, 2 * Math.PI);
		this.global.ctx.fillStyle = gradient;
		this.global.ctx.shadowColor = "#ffffffaa";
		this.global.ctx.shadowBlur = zero ? luminosity / 3 : luminosity;

		if (!atmosphere) return;
		const atmosphericGradient = this.createCompositionalGradient(
			x,
			y,
			radius,
			color,
			composition
		);
		this.global.ctx.fillStyle = atmosphericGradient;
		this.global.ctx.shadowColor = color;
	}

	createCompositionalGradient(
		x: number,
		y: number,
		radius: number,
		color: string,
		composition: string[],
		compositionBase: {
			[key: string]: string;
		} = AstroObjectDisplay.atmosphericColor
	) {
		const atmosphericGradient = this.global.ctx.createRadialGradient(
			x,
			y,
			0,
			x,
			y,
			radius
		);
		atmosphericGradient.addColorStop(
			0,
			color + AstroObjectDisplay.GRADIENT_EFFECT
		);
		atmosphericGradient.addColorStop(
			1 / (composition.length + 1),
			color + AstroObjectDisplay.GRADIENT_FADE
		);
		composition.forEach((element, index) => {
			atmosphericGradient.addColorStop(
				(index + 2) / (composition.length + 1),
				compositionBase[element as keyof typeof compositionBase] +
					AstroObjectDisplay.GRADIENT_FADE
			);
		});

		return atmosphericGradient;
	}
}
