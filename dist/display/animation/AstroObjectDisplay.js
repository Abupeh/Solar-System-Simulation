import { GuiElement } from "../../layout/class/GuiElement.js";
export class AstroObjectDisplay {
    global;
    static GRADIENT_FADE = "ff";
    static GRADIENT_EFFECT = "bb";
    static SHADOW_COLOR = "#ffffff";
    static SHADOW_BLUR = 0.5;
    static textColor = "#ffffff";
    static textOffset = 1.5;
    static ZOOM_QUALITY = 0.1;
    constructor(global) {
        this.global = global;
    }
    draw(astroObject, zero = false, zeroRadius) {
        const astroObjectDisplay = this.getFollowingPosition(astroObject, zero, zeroRadius);
        const gradient = this.createGradient(astroObjectDisplay);
        this.global.ctx.save();
        this.global.ctx.beginPath();
        this.renderText(astroObjectDisplay, zero);
        this.renderBody(astroObjectDisplay, zero, astroObject.properties.radius, gradient);
        this.global.ctx.fill();
        this.renderRing(astroObjectDisplay, astroObject.properties.radius, zero);
        this.global.ctx.restore();
    }
    getFollowingPosition(astroObject, zero, zeroRadius = astroObject.properties.radius, { followingX, followingY } = this.global.tracker) {
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
        };
    }
    createGradient({ kinematics: { position: { x, y }, }, properties: { radius, color }, }) {
        const gradient = this.global.ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, color + AstroObjectDisplay.GRADIENT_EFFECT);
        gradient.addColorStop(1, color + AstroObjectDisplay.GRADIENT_FADE);
        return gradient;
    }
    renderText({ kinematics: { position: { x, y }, }, properties: { radius, name }, }, zero = false) {
        if (!zero)
            this.global.ctx.font = `${(radius / this.global.camera.zoom) * AstroObjectDisplay.ZOOM_QUALITY}px ${GuiElement.font}`;
        this.global.ctx.fillStyle = "#ffffff";
        const offset = AstroObjectDisplay.textOffset * radius;
        this.global.ctx.fillText(name, x, y + (zero ? -offset : offset));
    }
    renderRing({ kinematics: { position: { x, y }, }, properties: { luminosity, radius, rings: { rings, color, distance, thickness }, spin, }, }, originalRadius, zero = false) {
        if (!rings)
            return;
        this.global.ctx.save();
        this.global.ctx.translate(x, y);
        if (zero)
            this.global.ctx.rotate(Math.PI / 2.5 + (spin * Math.PI) / 360);
        else
            this.global.ctx.rotate((spin * Math.PI) / 180);
        this.global.ctx.beginPath();
        const zeroThickness = thickness * (radius / originalRadius);
        const zeroDistance = distance * (radius / originalRadius);
        const innerRadius = radius + zeroDistance;
        const outerRadius = radius + zeroThickness + zeroDistance;
        this.global.ctx.ellipse(0, 0, innerRadius - (radius + zeroThickness), innerRadius, 0, 0, Math.PI * 2);
        this.global.ctx.ellipse(0, 0, outerRadius - (radius + zeroThickness), outerRadius + zeroThickness * 2, 0, 0, Math.PI * 2, true);
        this.global.ctx.closePath();
        this.global.ctx.fillStyle = color + "55";
        this.global.ctx.fill();
        this.global.ctx.restore();
    }
    renderBody({ kinematics: { position: { x, y }, }, properties: { radius, luminosity, atmosphere: { atmosphere, color }, }, }, zero = false, originalRadius, gradient) {
        this.global.ctx.arc(x, y, radius, 0, 2 * Math.PI);
        this.global.ctx.fillStyle = gradient;
        this.global.ctx.shadowColor = "#ffffffaa";
        this.global.ctx.shadowBlur = zero
            ? luminosity / 3
            : luminosity;
        if (!atmosphere)
            return;
        this.global.ctx.shadowColor = color;
    }
}
