import { SolarSystem } from "../components/SolarSystem.js";
import { Vector } from "../components/Vector.js";
import { Config } from "../config/config.js";
import { CelestialBody } from "../container/CelestialBody.js";
import { Astroid } from "../elements/Astroid.js";
import { Updater } from "../updates/Updater.js";
import { Camera } from "./Camera.js";

export class Canvas {
	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
	camera: Camera;

	constructor(public updater: Updater) {
		this.canvas = document.getElementById("solarCanvas") as HTMLCanvasElement;
		this.ctx = this.canvas.getContext("2d")!;

		this.camera = new Camera(this.canvas);

		this.resize();
		window.addEventListener("resize", () => this.resize());
	}

	public resize(): void {
		this.canvas.width = Config.WIDTH;
		this.canvas.height = Config.HEIGHT;
	}

	public animate(body: CelestialBody) {
		body.push++;

		if ((!body as any) instanceof Astroid) {
			// Draw trail
			if (body.trail.length > 0) {
				this.ctx.beginPath();
				this.ctx.moveTo(body.trail[0][0], body.trail[0][1]);
				for (const point of body.trail) {
					this.ctx.lineTo(point[0], point[1]);
				}
				this.ctx.strokeStyle = body.color + "55";
				this.ctx.lineWidth = body.radius / 4;
				this.ctx.stroke();
			}

			if (body.push > Config.TRAIL_PUSH) {
				body.trail.push([body.position.x, body.position.y]);
				body.push = 0;
			}
			if (body.trail.length > Config.TRAIL_LENGTH) body.trail.shift();
		}

		// Draw body
		const gradient = this.ctx.createRadialGradient(
			body.position.x,
			body.position.y,
			0,
			body.position.x,
			body.position.y,
			body.radius
		);
		gradient.addColorStop(0, body.color);
		gradient.addColorStop(1, body.color + "88");

		this.ctx.beginPath();
		this.ctx.arc(body.position.x, body.position.y, body.radius, 0, Math.PI * 2);
		this.ctx.fillStyle = gradient;
		this.ctx.fill();
	}

	first = true;

	render(solarSystem: SolarSystem): void {
		this.ctx.fillStyle = Config.BACKGROUND_COLOR;
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		this.ctx.save();
		this.ctx.translate(this.camera.offsetX, this.camera.offsetY);
		this.ctx.scale(this.camera.scroll, this.camera.scroll);

		for (const body of solarSystem.bodies) {
			this.animate(body);
			this.updater.update(body);
		}
		this.ctx.restore();
		requestAnimationFrame(() => this.render(solarSystem));
	}
}
