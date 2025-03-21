import { Vector } from "../../modules/Vector.js";
export class Camera {
    global;
    static INITIAL_ZOOM = 0.003;
    static SCROLL_SPEED = 1.2;
    static DRAG_BUTTON = 1;
    eventListeners = [
        [this.scroll, "wheel"],
        [this.mouseDown, "mousedown"],
        [this.mouseMove, "mousemove"],
        [this.mouseUp, "mouseup"],
    ];
    zoom = Camera.INITIAL_ZOOM;
    position = new Vector(0, 0);
    drag = this.resetDrag();
    constructor(global) {
        this.global = global;
        this.setupEventListeners();
    }
    setupEventListeners() {
        this.eventListeners.forEach(([action, listener]) => this.global.canvas.addEventListener(listener, action.bind(this)));
    }
    resetDrag() {
        return {
            start: new Vector(0, 0),
            end: new Vector(0, 0),
            offset: new Vector(0, 0),
            active: false,
        };
    }
    getPosition() {
        return [this.position.x / this.zoom, this.position.y / this.zoom];
    }
    offset() {
        return [
            this.position.x + this.drag.offset.x,
            this.position.y + this.drag.offset.y,
        ];
    }
    getPureMouse(x, y) {
        return [x / this.zoom, y / this.zoom];
    }
    getMouse(x, y) {
        const [offsetX, offsetY] = this.offset();
        return [
            (x - this.global.centerWidth) / this.zoom - offsetX - this.global.tracker.followingX(),
            (y - this.global.centerHeight) / this.zoom - offsetY - this.global.tracker.followingY(),
        ];
    }
    scroll(event) {
        if (this.drag.active)
            return;
        this.zoom *= event.deltaY > 0 ? 1 / Camera.SCROLL_SPEED : Camera.SCROLL_SPEED;
    }
    mouseDown({ clientX, clientY, button }) {
        if (button !== Camera.DRAG_BUTTON)
            return;
        [this.drag.start.x, this.drag.start.y] = this.getPureMouse(clientX, clientY);
        this.drag.active = true;
    }
    mouseMove({ clientX, clientY }) {
        if (!this.drag.active)
            return;
        [this.drag.end.x, this.drag.end.y] = this.getPureMouse(clientX, clientY);
        this.drag.offset = Vector.distance(this.drag.end, this.drag.start);
    }
    mouseUp() {
        if (!this.drag.active)
            return;
        this.position.add(this.drag.offset);
        this.drag = this.resetDrag();
    }
}
