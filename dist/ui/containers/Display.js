import { AstroObjectDisplay } from "../display/AstroObject.js";
import { Camera } from "./Camera.js";
import { Mouse } from "./Mouse.js";
export class Display {
    static BACKGROUND_COLOR = "#000000";
    //:Clean
    canvas = document.getElementById("canvas");
    ctx = this.canvas.getContext("2d");
    astroObjectDisplay = new AstroObjectDisplay(this);
    camera = new Camera(this);
    mouse = new Mouse(this);
    constructor() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    reset() {
        this.ctx.fillStyle = Display.BACKGROUND_COLOR;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    render(universe) {
        this.reset();
        this.ctx.save();
        //? Update Mouse
        this.mouse.follow(this.camera);
        //? Transform
        this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
        this.ctx.scale(this.camera.zoom, this.camera.zoom);
        const { x, y } = this.camera.offset();
        this.ctx.translate(x, y);
        //? Update AstroObjects
        universe.update();
        //? Render AstroObjects
        universe.astroObjects.forEach((astroObject) => this.astroObjectDisplay.draw(astroObject));
        this.ctx.restore();
        //Rerender
        requestAnimationFrame(() => this.render(universe));
    }
}
