import { Vector } from "../../containers/Vector.js";
export class Camera {
    display;
    static INITIAL_ZOOM = 1;
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
    constructor(display) {
        this.display = display;
        this.setupEventListeners();
    }
    setupEventListeners() {
        this.eventListeners.forEach(([action, listener]) => this.display.canvas.addEventListener(listener, action.bind(this)));
    }
    resetDrag() {
        return {
            start: new Vector(0, 0),
            end: new Vector(0, 0),
            offset: new Vector(0, 0),
            active: false,
        };
    }
    offset() {
        return [
            this.position.x + this.drag.offset.x,
            this.position.y + this.drag.offset.y,
        ];
    }
    getMouse(x, y) {
        return [
            (x - this.display.centerWidth) / this.zoom,
            (y - this.display.centerHeight) / this.zoom,
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
        [this.drag.start.x, this.drag.start.y] = this.getMouse(clientX, clientY);
        this.drag.active = true;
    }
    mouseMove({ clientX, clientY }) {
        if (!this.drag.active)
            return;
        [this.drag.end.x, this.drag.end.y] = this.getMouse(clientX, clientY);
        this.drag.offset = Vector.distance(this.drag.end, this.drag.start);
    }
    mouseUp() {
        if (!this.drag.active)
            return;
        this.position.add(this.drag.offset);
        this.drag = this.resetDrag();
    }
}
