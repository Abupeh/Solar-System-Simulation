import { Config } from "../config/config.js";
export class Camera {
    canvas;
    isDragging = false;
    lastMouseX = 0;
    lastMouseY = 0;
    offsetX = 0;
    offsetY = 0;
    scroll = Config.INITIAL_SCROLL;
    constructor(canvas) {
        this.canvas = canvas;
        this.setupEventListeners();
    }
    setupEventListeners() {
        this.canvas.addEventListener("mousedown", this.handleMouseDown.bind(this));
        this.canvas.addEventListener("mousemove", this.handleMouseMove.bind(this));
        this.canvas.addEventListener("mouseup", this.handleMouseUp.bind(this));
        this.canvas.addEventListener("mouseleave", this.handleMouseUp.bind(this));
        this.canvas.addEventListener("wheel", this.handleScroll.bind(this));
    }
    handleScroll(event) {
        this.scroll *= event.deltaY > 0 ? (1 / Config.SCROLL) : Config.SCROLL;
    }
    handleMouseDown(event) {
        this.isDragging = true;
        this.lastMouseX = event.clientX;
        this.lastMouseY = event.clientY;
        this.canvas.style.cursor = "grabbing";
    }
    handleMouseMove(event) {
        if (!this.isDragging)
            return;
        const dx = event.clientX - this.lastMouseX;
        const dy = event.clientY - this.lastMouseY;
        this.offsetX += dx;
        this.offsetY += dy;
        this.lastMouseX = event.clientX;
        this.lastMouseY = event.clientY;
    }
    handleMouseUp() {
        this.isDragging = false;
        this.canvas.style.cursor = "grab";
    }
}
