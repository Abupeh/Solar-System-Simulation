import { PlaceDisplay } from "../../environment/context/PlaceDisplay.js";
export class GuiElement {
    global;
    static font = "Montserrat";
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
        this.cutoff(element);
        this.drawBase(element);
        this.drawLayer(element);
        this.global.ctx.restore();
    }
    cutoff(element) {
        if (!element.placeDisplay)
            return;
        this.global.ctx.save();
        const rect = {
            x: PlaceDisplay.cutoffX,
            y: PlaceDisplay.cutoffY,
            width: PlaceDisplay.cutoffWidth,
            height: PlaceDisplay.cutoffHeight,
            placeDisplay: false,
            enabled: false,
        };
        this.scale(rect);
        this.global.ctx.rect(rect.x, rect.y, rect.width, rect.height);
        this.global.ctx.clip();
    }
}
