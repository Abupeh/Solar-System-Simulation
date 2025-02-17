import { Vector } from "../components/Vector.js";
import { Config } from "../config/config.js";

export class Camera {
	public zoom = Config.INITIAL_SCROLL;

	private offset = new Vector([0, 0]);
	public drag = this.resetDrag();
	constructor(public canvas: HTMLCanvasElement) {
		this.setupEventListeners();
	}

	private resetDrag() {
		return {
			start: new Vector([0, 0]),
			end: new Vector([0, 0]),
			offset: new Vector([0, 0]),
			active: false,
		};
	}

	public goTo(position: Vector) {
		this.offset = this.offset.subtract(position);
	}

	public getOffset() {
		return this.offset.add(this.drag.offset);
	}

	public getMouse(evt: MouseEvent) {
		return new Vector([
			(evt.clientX * 1) / this.zoom,
			(evt.clientY * 1) / this.zoom,
		]);
	}

	private setupEventListeners(): void {
		this.canvas.addEventListener("wheel", this.handleScroll.bind(this));
		this.canvas.addEventListener("mousedown", this.handleMouseDown.bind(this));
		this.canvas.addEventListener("mousemove", this.handleMouseMove.bind(this));
		this.canvas.addEventListener("mouseup", this.handleMouseUp.bind(this));
	}

	private handleScroll(event: WheelEvent): void {
		if(this.drag.active) return;
		this.zoom *= event.deltaY > 0 ? 1 / Config.SCROLL : Config.SCROLL;
	}

	private handleMouseDown(event: MouseEvent) {
		if (event.button !== 1) return (this.canvas.style.cursor = "");
		this.drag.start = this.getMouse(event);
		this.drag.active = true;

		this.canvas.style.cursor = "grabbing";
	}
	private handleMouseMove(event: MouseEvent): void {
		if (!this.drag.active) return;
		this.drag.end = this.getMouse(event);
		this.drag.offset = this.drag.end.subtract(this.drag.start);
	}

	private handleMouseUp(): void {
		if (!this.drag.active) return;
		this.offset = this.offset.add(this.drag.offset);
		this.drag = this.resetDrag();

		this.canvas.style.cursor = "";
	}
}
