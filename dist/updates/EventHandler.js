export class EventHandler {
    display;
    constructor(display) {
        this.display = display;
    }
    keydown(key, callback) {
        document.addEventListener("keydown", (event) => {
            if (event.key == key)
                callback();
        });
    }
    onclick(callback) {
        document.addEventListener("click", (mouse) => callback(mouse.offsetX, mouse.offsetY));
    }
}
