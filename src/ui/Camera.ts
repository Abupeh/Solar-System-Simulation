import { Config } from "../config/config.js";

export class Camera {
	private isDragging = false;
	private lastMouseX = 0;
	private lastMouseY = 0;
	public offsetX = 0;
	public offsetY = 0;
	public scroll = Config.INITIAL_SCROLL;

	constructor(public canvas: HTMLCanvasElement) {
		this.setupEventListeners();
	}

	private setupEventListeners(): void {
		this.canvas.addEventListener("mousedown", this.handleMouseDown.bind(this));
		this.canvas.addEventListener("mousemove", this.handleMouseMove.bind(this));
		this.canvas.addEventListener("mouseup", this.handleMouseUp.bind(this));
		this.canvas.addEventListener("mouseleave", this.handleMouseUp.bind(this));
		this.canvas.addEventListener("wheel", this.handleScroll.bind(this));
	}

	private handleScroll(event: WheelEvent): void {
		this.scroll *= event.deltaY > 0 ? (1/Config.SCROLL) : Config.SCROLL;
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
}
