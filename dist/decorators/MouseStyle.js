export class Cursor {
    global;
    constructor(global) {
        this.global = global;
    }
    grab() {
        this.global.canvas.style.cursor = "grabbing";
    }
    basic() {
        this.global.canvas.style.cursor = "";
    }
    select() {
        this.global.canvas.style.cursor = "pointer";
    }
    followButton(button) {
        if (button.selectCallBack)
            return this.grab();
        this.basic();
    }
    followCamera(camera) {
        if (camera.drag.active)
            return this.grab();
        this.basic();
    }
}
