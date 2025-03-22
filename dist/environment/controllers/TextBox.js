export class TextBox {
    global;
    x;
    y;
    width;
    height;
    text;
    displayText;
    type;
    enabled = true;
    constructor(global, x, y, width, height, text, displayText, type) {
        this.global = global;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.text = text;
        this.displayText = displayText;
        this.type = type;
        this.text = this.text.toString();
        this.global.event.onclick(this.handleClick.bind(this));
        document.addEventListener("keydown", this.handleKeyDown.bind(this));
        this.global.event.onmousemove(this.handleHover.bind(this));
        this.complete();
    }
    placeDisplay = false;
    focused = false;
    handleClick(x, y) {
        if (this.focused)
            return this.complete();
        if (!this.onBox(x, y))
            return;
        this.global.content.controllers.forEach((controller) => controller instanceof TextBox && (controller.focused = false));
        this.focused = !this.focused;
    }
    static checkRGB(rgb) {
        rgb = rgb.replaceAll(/[^0-9a-fA-F]/gi, "a");
        if (rgb[0] != "#")
            rgb = '#' + rgb.slice(1);
        if (rgb.length < 7)
            rgb = rgb.padEnd(7, "a");
        if (rgb.length > 7)
            rgb = rgb.slice(0, 7);
        return rgb;
    }
    onChange(callback) {
        this.callback = () => callback(this.value);
        return this;
    }
    callback = () => { };
    static checkAllowed(text) {
        return text.replaceAll(/[^0-9a-zA-Z\.]/gi, "");
    }
    handleKeyDown(event) {
        if (!this.focused)
            return;
        this.text = TextBox.checkAllowed(this.text);
        if (event.key == "Backspace")
            this.text = this.text.slice(0, -1);
        if (event.key == "Enter")
            this.complete();
        if (this.type == "number") {
            if (event.key < "0" || event.key > "9")
                return;
        }
        if (this.type == "color" && this.text[0] != '#')
            this.text = "#" + this.text;
        if (event.key.length > 1)
            return;
        this.text += event.key;
    }
    complete() {
        this.focused = false;
        if (this.type == "color")
            this.text = TextBox.checkRGB(this.text);
        this.value = this.text;
        if (this.type == "number") {
            if (this.text.length == 0)
                this.text = "0";
            this.value = new Number(this.text);
        }
        this.callback(this.value);
    }
    value = "";
    hover = false;
    handleHover(x, y) {
        if (this.onBox(x, y))
            return (this.hover = true);
        this.hover = false;
    }
    onBox(x, y) {
        if (!this.enabled)
            return;
        return (x > this.x &&
            x < this.x + this.width &&
            y > this.y &&
            y < this.y + this.height);
    }
}
