export class EventHandler {
    constructor() { }
    keydown(key, callback) {
        document.addEventListener("keydown", (event) => {
            if (event.key == key)
                callback();
        });
    }
    onmousemove(callback) {
        document.addEventListener("mousemove", (mouse) => {
            callback(mouse.offsetX, mouse.offsetY);
        });
    }
    onclick(callback) {
        document.addEventListener("click", (mouse) => callback(mouse.offsetX, mouse.offsetY));
    }
}
