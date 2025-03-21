export class MouseStyle {
    display;
    constructor(display) {
        this.display = display;
    }
    grab() {
        this.display.canvas.style.cursor = "grabbing";
    }
    basic() {
        this.display.canvas.style.cursor = "";
    }
    follow(camera) {
        if (camera.drag.active)
            return this.grab();
        this.basic();
    }
}
