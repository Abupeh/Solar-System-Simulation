export class GuiElement {
    global;
    static font = 'Montserrat';
    constructor(global) {
        this.global = global;
    }
    scale(element) {
        element.x *= this.global.ratioX;
        element.y *= this.global.ratioY;
        element.width *= this.global.ratioX;
        element.height *= this.global.ratioY;
    }
    draw(element) {
        if (!element.enabled)
            return;
        this.drawBase(element);
        this.drawLayer(element);
    }
}
