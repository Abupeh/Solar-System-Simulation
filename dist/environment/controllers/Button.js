export class Button {
    global;
    x;
    y;
    width;
    height;
    text;
    callback = () => { };
    selectCallBack;
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
    onButton(x, y) {
        return (x > this.x &&
            x < this.x + this.width &&
            y > this.y &&
            y < this.y + this.height);
    }
    hover = false;
    handleHover(x, y) {
        if (this.onButton(x, y))
            return (this.hover = true);
        this.hover = false;
    }
    isSelected() {
        return !!this.selectCallBack;
    }
    hold = false;
    handleClick(x, y) {
        if (this.onButton(x, y)) {
            if (this.isSelected())
                this.hold = true;
            this.selectCallBack = undefined;
        }
        this.selectCallBack?.(this.global.camera.getMouse(x, y));
        this.selectCallBack = undefined;
        if (this.onButton(x, y) && !this.hold)
            this.callback(this.global.camera.getMouse(x, y));
        this.hold = false;
    }
    onSelectClick(callback) {
        this.callback = () => (this.selectCallBack = callback); // add callback
        return this;
    }
    onclick(callback) {
        this.callback = callback;
        return this;
    }
}
