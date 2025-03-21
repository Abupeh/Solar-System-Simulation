export class GuiElement {
    display;
    constructor(display) {
        this.display = display;
    }
    scale(element) {
        element.x *= this.display.ratioX;
        element.y *= this.display.ratioY;
        element.width *= this.display.ratioX;
        element.height *= this.display.ratioY;
    }
    draw(element) {
        this.drawSquare(element);
        this.drawText(element);
    }
}
