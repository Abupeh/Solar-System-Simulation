import { Vector } from "../components/Vector.js";
import { Config } from "../config/config.js";
export class Camera {
    canvas;
    zoom = Config.INITIAL_SCROLL;
    offset = new Vector([0, 0]);
    drag = this.resetDrag();
    constructor(canvas) {
        this.canvas = canvas;
        this.setupEventListeners();
    }
    resetDrag() {
        return {
            start: new Vector([0, 0]),
            end: new Vector([0, 0]),
            offset: new Vector([0, 0]),
            active: false,
        };
    }
    goTo(position) {
        this.offset = this.offset.subtract(position);
    }
    getOffset() {
        return this.offset.add(this.drag.offset);
    }
    getMouse(evt) {
        return new Vector([
            (evt.clientX * 1) / this.zoom,
            (evt.clientY * 1) / this.zoom,
        ]);
    }
    setupEventListeners() {
        this.canvas.addEventListener("wheel", this.handleScroll.bind(this));
        this.canvas.addEventListener("mousedown", this.handleMouseDown.bind(this));
        this.canvas.addEventListener("mousemove", this.handleMouseMove.bind(this));
        this.canvas.addEventListener("mouseup", this.handleMouseUp.bind(this));
    }
    handleScroll(event) {
        if (this.drag.active)
            return;
        this.zoom *= event.deltaY > 0 ? 1 / Config.SCROLL : Config.SCROLL;
    }
    handleMouseDown(event) {
        if (event.button !== 1)
            return (this.canvas.style.cursor = "");
        this.drag.start = this.getMouse(event);
        this.drag.active = true;
        this.canvas.style.cursor = "grabbing";
    }
    handleMouseMove(event) {
        if (!this.drag.active)
            return;
        this.drag.end = this.getMouse(event);
        this.drag.offset = this.drag.end.subtract(this.drag.start);
    }
    handleMouseUp() {
        if (!this.drag.active)
            return;
        this.offset = this.offset.add(this.drag.offset);
        this.drag = this.resetDrag();
        this.canvas.style.cursor = "";
    }
}
