export class EventHandler {
    mouseX = 0;
    mouseY = 0;
    constructor() {
        this.addEventListeners();
    }
    addEventListeners() {
        document.addEventListener("keydown", (event) => {
            this.keydownCallbacks.forEach((callback) => callback(event.key));
        });
        document.addEventListener("mousemove", (event) => {
            this.mousemoveCallbacks.forEach((callback) => {
                this.mouseX = event.offsetX;
                this.mouseY = event.offsetY;
                callback(event.offsetX, event.offsetY);
            });
        });
        document.addEventListener("click", (event) => {
            this.clickCallbacks.forEach((callback) => callback(event.offsetX, event.offsetY));
        });
        document.addEventListener("wheel", (event) => {
            this.scrollCallbacks.forEach((callback) => callback(event.deltaY > 0 ? 1 : -1));
        });
    }
    keydownCallbacks = [];
    mousemoveCallbacks = [];
    clickCallbacks = [];
    scrollCallbacks = [];
    keydown(key, callback) {
        this.keydownCallbacks.push((eventKey) => {
            if (key == eventKey)
                callback();
        });
    }
    onmousemove(callback) {
        this.mousemoveCallbacks.push(callback);
    }
    onclick(callback) {
        this.clickCallbacks.push(callback);
    }
    scroll(callback) {
        this.scrollCallbacks.push(callback);
    }
}
