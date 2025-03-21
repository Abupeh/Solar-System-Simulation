export class AstroObjectDisplay {
    display;
    static GRADIENT_FADE = "ff";
    static GRADIENT_EFFECT = "bb";
    static SHADOW_COLOR = "#ffffff";
    static SHADOW_BLUR = .5;
    constructor(display) {
        this.display = display;
    }
    draw(astroObject) {
        const gradient = this.createGradient(astroObject);
        this.display.ctx.beginPath();
        this.renderBody(astroObject, gradient);
        this.display.ctx.fill();
    }
    createGradient({ kinematics: { position: { x, y }, }, radius, color, }) {
        const gradient = this.display.ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, color + AstroObjectDisplay.GRADIENT_EFFECT);
        gradient.addColorStop(1, color + AstroObjectDisplay.GRADIENT_FADE);
        return gradient;
    }
    renderBody({ kinematics: { position: { x, y }, }, radius, }, gradient) {
        this.display.ctx.arc(x, y, radius, 0, 2 * Math.PI);
        this.display.ctx.shadowColor = AstroObjectDisplay.SHADOW_COLOR;
        this.display.ctx.shadowBlur = AstroObjectDisplay.SHADOW_BLUR;
        this.display.ctx.fillStyle = gradient;
    }
}
