export class GuiElementDisplay {
    display;
    constructor(display) {
        this.display = display;
    }
    scale(element, gui = this.display.gui) {
        element.x *= gui.ratioX;
        element.y *= gui.ratioY;
        element.width *= gui.ratioX;
        element.height *= gui.ratioY;
    }
    draw(element) {
        this.drawSquare(element);
        this.drawText(element);
    }
}
