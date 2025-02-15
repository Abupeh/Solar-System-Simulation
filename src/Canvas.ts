import { Config } from "./config/config.js";

export class Canvas {
	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
	private isDragging = false;
	private lastMouseX = 0;
	private lastMouseY = 0;
	private offsetX = 0;
	private offsetY = 0;

	constructor() {
		this.canvas = document.getElementById("solarCanvas") as HTMLCanvasElement;
		this.ctx = this.canvas.getContext("2d")!;

		this.resizeCanvas();
		window.addEventListener("resize", () => this.resizeCanvas());
		this.setupEventListeners();
	}

	private setupEventListeners(): void {
		this.canvas.addEventListener("mousedown", this.handleMouseDown.bind(this));
		this.canvas.addEventListener("mousemove", this.handleMouseMove.bind(this));
		this.canvas.addEventListener("mouseup", this.handleMouseUp.bind(this));
		this.canvas.addEventListener("mouseleave", this.handleMouseUp.bind(this));
	}

	private handleMouseDown(event: MouseEvent): void {
		this.isDragging = true;
		this.lastMouseX = event.clientX;
		this.lastMouseY = event.clientY;
		this.canvas.style.cursor = "grabbing";
	}

	private handleMouseMove(event: MouseEvent): void {
		if (!this.isDragging) return;

		const dx = event.clientX - this.lastMouseX;
		const dy = event.clientY - this.lastMouseY;

		this.offsetX += dx;
		this.offsetY += dy;

		this.lastMouseX = event.clientX;
		this.lastMouseY = event.clientY;
	}

	private handleMouseUp(): void {
		this.isDragging = false;
		this.canvas.style.cursor = "grab";
	}

	private resizeCanvas(): void {
		this.canvas.width = Config.WIDTH;
		this.canvas.height = Config.HEIGHT;
	}

	animate(animation: (offsetX: number, offsetY: number) => void): void {
		this.ctx.fillStyle = Config.BACKGROUND_COLOR;
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

		animation(this.offsetX, this.offsetY);
		requestAnimationFrame(() => this.animate(() => animation(this.offsetX, this.offsetY)));
	}
}
