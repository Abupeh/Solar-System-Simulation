import { Vector } from "../components/Vector.js";
import { Config } from "../config/config.js";
export class Camera {
    canvas;
    zoom = Config.INITIAL_SCROLL;
    position = new Vector([0, 0]);
    drag = this.resetDrag();
    centerX = Config.WIDTH / 2;
    centerY = Config.HEIGHT / 2;
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
    followingBody = null;
    follow() {
        if (!this.followingBody)
            return;
        this.position = this.drag.offset.subtract(this.followingBody.position);
    }
    getRelativeMouse(evt) {
        const following = this.followingBody?.position || this.position.scale(-1);
        return following.add(this.getMouse(evt).subtract(this.getCenter()));
    }
    getOffset() {
        return this.drag.offset.add(this.position);
    }
    getCenter() {
        return new Vector([this.centerX / this.zoom, this.centerY / this.zoom]);
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
        this.position = this.position.add(this.drag.offset);
        this.drag = this.resetDrag();
        this.canvas.style.cursor = "";
    }
}
