import { Global } from "../../global/Global.js";
import { Vector } from "../../modules/Vector.js";

export class Camera {
	static INITIAL_ZOOM = 0.003;
	static SCROLL_SPEED = 1.2;
	static DRAG_BUTTON = 1;

	private eventListeners: [Function, any][] = [
		[this.scroll, "wheel"],
		[this.mouseDown, "mousedown"],
		[this.mouseMove, "mousemove"],
		[this.mouseUp, "mouseup"],
	];

	public zoom = Camera.INITIAL_ZOOM;
	public position = new Vector(0, 0);
	public drag = this.resetDrag();

	constructor(private global: Global) {
		this.setupEventListeners();
	}

	setupEventListeners() {
		this.eventListeners.forEach(([action, listener]) =>
			this.global.canvas.addEventListener(listener, action.bind(this))
		);
	}

	private resetDrag() {
		return {
			start: new Vector(0, 0),
			end: new Vector(0, 0),
			offset: new Vector(0, 0),
			active: false,
		};
	}

	public getPosition() {
		return [this.position.x / this.zoom, this.position.y / this.zoom];
	}

	public offset() {
		return [
			this.position.x + this.drag.offset.x,
			this.position.y + this.drag.offset.y,
		];
	}

	public getPureMouse(x: number, y: number): [number, number] {
		return [x / this.zoom, y / this.zoom];
	}
	public getMouse(x: number, y: number): [number, number] {
		const [offsetX, offsetY] = this.offset();
		
		return [
			(x - this.global.centerWidth) / this.zoom - offsetX - this.global.tracker.followingX(),
			(y - this.global.centerHeight) / this.zoom - offsetY - this.global.tracker.followingY(),
		];
	}

	private scroll(event: WheelEvent) {
		if (this.drag.active) return;
		this.zoom *= event.deltaY > 0 ? 1 / Camera.SCROLL_SPEED : Camera.SCROLL_SPEED;
	}

	private mouseDown({ clientX, clientY, button }: MouseEvent) {
		if (button !== Camera.DRAG_BUTTON) return;
		[this.drag.start.x, this.drag.start.y] = this.getPureMouse(clientX, clientY);
		this.drag.active = true;
	}

	private mouseMove({ clientX, clientY }: MouseEvent) {
		if (!this.drag.active) return;
		[this.drag.end.x, this.drag.end.y] = this.getPureMouse(clientX, clientY);
		this.drag.offset = Vector.distance(this.drag.end, this.drag.start);
	}

	private mouseUp() {
		if (!this.drag.active) return;
		this.position.add(this.drag.offset);
		this.drag = this.resetDrag();
	}
}
