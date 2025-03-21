import { AstroObjectDisplay } from "../../ui/display/components/AstroObject.js";
import { Camera } from "../../ui/containers/Camera.js";
import { MouseStyle } from "../../ui/containers/MouseStyle.js";
import { Time } from "../../updates/Time.js";
import { EventHandler } from "../../updates/EventHandler.js";
import { Trail } from "../../updates/Trail.js";
import { Gui } from "../../ui/display/Gui.js";
export class Display {
    static BACKGROUND_COLOR = "#000000";
    static MAX_RATIO = 100;
    event = new EventHandler(this);
    canvas = document.getElementById("canvas");
    ctx = this.canvas.getContext("2d");
    astroObjectDisplay = new AstroObjectDisplay(this);
    camera = new Camera(this);
    mouseStyle = new MouseStyle(this);
    time = new Time(this);
    trail = new Trail(this);
    ratioX = 0;
    ratioY = 0;
    gui;
    constructor() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.centerWidth = this.canvas.width / 2;
        this.centerHeight = this.canvas.height / 2;
        this.ratioX = this.canvas.width / Gui.MAX_RATIO;
        this.ratioY = this.canvas.height / Gui.MAX_RATIO;
        this.gui = new Gui(this);
        this.gui.scale();
    }
    centerWidth;
    centerHeight;
    reset() {
        this.ctx.fillStyle = Display.BACKGROUND_COLOR;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    transform() {
        this.ctx.translate(this.centerWidth, this.centerHeight);
        this.ctx.scale(this.camera.zoom, this.camera.zoom);
        const [x, y] = this.camera.offset();
        this.ctx.translate(x, y);
    }
    render(universe) {
        this.reset();
        this.mouseStyle.follow(this.camera);
        this.time.update(universe, this.trail);
        this.ctx.save();
        this.transform();
        //? Render AstroObjects
        universe.astroObjects.forEach((astroObject) => {
            this.trail.draw(astroObject);
            this.astroObjectDisplay.draw(astroObject);
        });
        this.ctx.restore();
        this.gui.render();
        //Rerender
        requestAnimationFrame(() => this.render(universe));
    }
    static ToHex(rgb) {
        const hex = rgb.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }
}
