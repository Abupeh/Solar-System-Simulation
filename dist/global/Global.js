import { Camera } from "../display/base/Camera.js";
import { Cursor } from "../decorators/Cursor.js";
import { Time } from "../updates/Time.js";
import { EventHandler } from "../updates/events/EventHandler.js";
import { Trail } from "../display/base/Trail.js";
import { AstroObjectDisplay } from "../display/animation/AstroObjectDisplay.js";
import { Gui } from "../layout/container/Gui.js";
import { Content } from "../content/Content.js";
import { Tracker } from "../display/base/Tracker.js";
export class Global {
    universe;
    static BACKGROUND_COLOR = "#000000";
    static MAX_RATIO = 100;
    event = new EventHandler();
    content;
    canvas = document.getElementById("canvas");
    ctx = this.canvas.getContext("2d");
    astroObjectDisplay = new AstroObjectDisplay(this);
    camera = new Camera(this);
    cursor = new Cursor(this);
    time = new Time(this);
    trail = new Trail(this);
    tracker = new Tracker(this);
    ratioX = 0;
    ratioY = 0;
    gui;
    constructor(universe) {
        this.universe = universe;
        this.content = new Content(this, this.universe);
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
        this.ctx.fillStyle = Global.BACKGROUND_COLOR;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    transform() {
        this.ctx.translate(this.centerWidth, this.centerHeight);
        this.ctx.scale(this.camera.zoom, this.camera.zoom);
        const [x, y] = this.camera.offset();
        this.ctx.translate(x, y);
    }
    render() {
        this.reset();
        if (this.time.iterations != 0) {
            this.tracker.trackFollow();
            this.time.update(this.universe, this.trail);
            if (this.tracker.following)
                this.tracker.follow(this.tracker.following);
        }
        this.cursor.followCamera(this.camera);
        this.cursor.followControllers(this.content.controllers);
        this.ctx.save();
        this.transform();
        //? Render AstroObjects
        this.universe.astroObjects.forEach((astroObject) => {
            this.trail.draw(astroObject);
            this.astroObjectDisplay.draw(astroObject);
        });
        this.ctx.restore();
        this.gui.render();
        //Rerender
        requestAnimationFrame(() => this.render());
    }
    static ToHex(rgb) {
        const hex = rgb.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }
}
