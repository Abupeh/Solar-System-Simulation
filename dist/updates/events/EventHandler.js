export class EventHandler {
    mouseX = 0;
    mouseY = 0;
    constructor() {
    }
    keydown(key, callback) {
        document.addEventListener("keydown", (event) => {
            if (event.key == key)
                callback();
        });
    }
    onmousemove(callback) {
        document.addEventListener("mousemove", (mouse) => {
            this.mouseX = mouse.offsetX;
            this.mouseY = mouse.offsetY;
            callback(mouse.offsetX, mouse.offsetY);
        });
    }
    onclick(callback) {
        document.addEventListener("click", (mouse) => callback(mouse.offsetX, mouse.offsetY));
    }
    scroll(callback) {
        document.addEventListener("wheel", (scrollEvent) => callback(scrollEvent?.deltaY > 0 ? 1 : -1));
    }
}
