import { Config } from "../config/config.js";
import { Camera } from "./Camera.js";
export class Canvas {
    updater;
    gui;
    canvas = document.getElementById("canvas");
    ctx = this.canvas.getContext("2d");
    centerX = Config.WIDTH / 2;
    centerY = Config.HEIGHT / 2;
    camera = new Camera(this.canvas);
    constructor(updater, gui) {
        this.updater = updater;
        this.gui = gui;
        this.resize();
        this.gui.camera = this.camera;
        this.gui.updater = this.updater;
    }
    resize() {
        this.canvas.width = Config.WIDTH;
        this.canvas.height = Config.HEIGHT;
    }
    toHex(rgb) {
        let hex = rgb.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }
    animate(body) {
        // Draw trail
        if (body.trail.length > 0) {
            this.ctx.lineWidth = body.radius / Config.TRAIL_SIZE;
            for (let i = 0; i < body.trail.length - 1; i++) {
                this.ctx.beginPath();
                let alpha = Math.floor((i / body.trail.length) * 2 * 255);
                if (body.reversalTrail)
                    alpha = Config.REVERSAL_TRAIL;
                this.ctx.strokeStyle = body.color + this.toHex(alpha);
                this.ctx.moveTo(body.trail[i][0], body.trail[i][1]);
                this.ctx.lineTo(body.trail[i + 1][0], body.trail[i + 1][1]);
                this.ctx.stroke();
            }
        }
        // Draw body
        const gradient = this.ctx.createRadialGradient(body.position.x, body.position.y, 0, body.position.x, body.position.y, body.radius);
        gradient.addColorStop(0, body.color + "bb");
        gradient.addColorStop(1, body.color);
        this.ctx.beginPath();
        this.ctx.arc(body.position.x, body.position.y, body.radius, 0, Math.PI * 2);
        this.ctx.shadowColor = "#ffffff";
        this.ctx.shadowBlur = Config.SHADOW_BLUR;
        this.ctx.fillStyle = gradient;
        this.ctx.fill();
    }
    render(solarSystem) {
        //Update
        this.updater.update(solarSystem.bodies);
        this.camera.follow();
        //Draw
        this.ctx.fillStyle = Config.BACKGROUND_COLOR;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.strokeStyle = 'transparent';
        this.ctx.save();
        //Panning / Scaling
        this.ctx.translate(this.centerX, this.centerY);
        this.ctx.scale(this.camera.zoom, this.camera.zoom);
        const offset = this.camera.getOffset();
        this.ctx.translate(offset.x, offset.y);
        for (const body of solarSystem.bodies) {
            this.animate(body);
        }
        this.ctx.restore();
        //GUI
        this.gui.draw();
        requestAnimationFrame(() => this.render(solarSystem));
    }
}
