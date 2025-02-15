import { Config } from "./config/config.js";
export class Canvas {
    canvas;
    ctx;
    isDragging = false;
    lastMouseX = 0;
    lastMouseY = 0;
    offsetX = 0;
    offsetY = 0;
    constructor() {
        this.canvas = document.getElementById("solarCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.resizeCanvas();
        window.addEventListener("resize", () => this.resizeCanvas());
        this.setupEventListeners();
    }
    setupEventListeners() {
        this.canvas.addEventListener("mousedown", this.handleMouseDown.bind(this));
        this.canvas.addEventListener("mousemove", this.handleMouseMove.bind(this));
        this.canvas.addEventListener("mouseup", this.handleMouseUp.bind(this));
        this.canvas.addEventListener("mouseleave", this.handleMouseUp.bind(this));
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
    resizeCanvas() {
        this.canvas.width = Config.WIDTH;
        this.canvas.height = Config.HEIGHT;
    }
    animate(animation) {
        this.ctx.fillStyle = Config.BACKGROUND_COLOR;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        animation(this.offsetX, this.offsetY);
        requestAnimationFrame(() => this.animate(() => animation(this.offsetX, this.offsetY)));
    }
}
