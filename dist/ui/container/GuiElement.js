export class GuiContainer {
    x;
    y;
    width;
    height;
    canvas = document.getElementById("canvas");
    ctx = this.canvas.getContext("2d");
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    draw() { }
}
