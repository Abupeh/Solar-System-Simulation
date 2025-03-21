export class Button {
    global;
    x;
    y;
    width;
    height;
    text;
    callback = () => { };
    containerCallbacks = [];
    constructor(global, x, y, width, height, text) {
        this.global = global;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.text = text;
        this.global.event.onclick(this.handleClick.bind(this));
        this.global.event.onmousemove(this.handleHover.bind(this));
    }
    hover = false;
    handleHover(x, y) {
        if (this.onButton(x, y))
            return (this.hover = true);
        this.hover = false;
    }
    defaultClick() {
        if ("toggled" in this)
            this.toggled = true;
        this.callback(0, 0);
    }
    size = 0;
    secondSize(total) {
        if (total == 1)
            this.size++;
        return this;
    }
    enabled = true;
    onClick(callback) {
        this.callback = (x, y) => {
            callback(this.global.camera.getMouse(x, y));
            this.containerCallbacks.forEach((containerCallback) => containerCallback(this.global.camera.getMouse(x, y)));
        };
        return this;
    }
    onButton(x, y) {
        if (!this.enabled)
            return;
        return (x > this.x &&
            x < this.x + this.width &&
            y > this.y &&
            y < this.y + this.height);
    }
}
