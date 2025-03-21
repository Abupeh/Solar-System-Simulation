export class Event {
    display;
    constructor(display) {
        this.display = display;
    }
    keypress(key, callback) {
        this.display.canvas.addEventListener('keydown', (event) => {
            if (event.key == key)
                callback();
        });
    }
}
