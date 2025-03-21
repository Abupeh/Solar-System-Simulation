import { Vector } from "../components/Vector.js";
import { Config } from "../config/config.js";
import { CelestialBody } from "../container/CelestialBody.js";

export class Camera {
	public zoom = Config.INITIAL_SCROLL;
	private position = new Vector([0, 0]);
	public drag = this.resetDrag();
	public centerX = Config.WIDTH / 2;
	public centerY = Config.HEIGHT / 2;

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
	referenceMode = false;

	public followingBody: CelestialBody | null = null;
	public follow() {
		if (!this.followingBody) return;
		this.position = this.drag.offset.subtract(this.followingBody.position);
	}

	public getRelativeMouse(evt: MouseEvent) {
		const following = this.followingBody?.position || this.position.scale(-1);
		return following.add(this.getMouse(evt).subtract(this.getCenter()));
	}

	public getRelativePos(pos: Vector) {
		const following = this.followingBody?.position || this.position.scale(-1);
		return following.add(pos.subtract(this.getCenter()));
	}

	public getOffset() {
		return this.drag.offset.add(this.position);
	}

	private getCenter() {
		return new Vector([this.centerX / this.zoom, this.centerY / this.zoom]);
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
		if (this.drag.active) return;
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
		this.position = this.position.add(this.drag.offset);
		this.drag = this.resetDrag();

		this.canvas.style.cursor = "";
	}
}
