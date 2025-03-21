export class Button {
    display;
    x;
    y;
    width;
    height;
    text;
    callbacks = [];
    constructor(display, x, y, width, height, text) {
        this.display = display;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.text = text;
        this.display.event.onclick(this.handleClick.bind(this));
    }
    handleClick(x, y) {
        if (x > this.x &&
            x < this.x + this.width &&
            y > this.y &&
            y < this.y + this.height) {
            this.callbacks.forEach((callback) => callback(this.display.camera.getMouse(x, y)));
        }
    }
    onclick(callback) {
        this.callbacks.push(callback);
        return this;
    }
}
