import { Universe } from "../core/Universe.js";
import { Camera } from "../display/base/Camera.js";
import { Cursor } from "../decorators/Cursor.js";
import { Time } from "../updates/Time.js";
import { EventHandler } from "../updates/events/EventHandler.js";
import { Trail } from "../display/base/Trail.js";
import { AstroObjectDisplay } from "../display/animation/AstroObjectDisplay.js";
import { Gui } from "../layout/container/Gui.js";
import { Content } from "../content/Content.js";
import { Tracker } from "../display/base/Tracker.js";
import { AstroObject } from "../components/astro/AstroObject.js";

export class Global {
	static BACKGROUND_COLOR = "#000000";
	static MAX_RATIO = 100;
	static GUI_FRAMERATE = 100;

	public event = new EventHandler();
	public content: Content;
	public canvas = document.getElementById("canvas") as HTMLCanvasElement;
	public ctx = this.canvas.getContext("2d")!;
	public astroObjectDisplay = new AstroObjectDisplay(this);
	public camera = new Camera(this);
	public cursor = new Cursor(this);
	public time = new Time(this);
	public trail = new Trail(this);
	public tracker = new Tracker(this);

	public ratioX = 0;
	public ratioY = 0;
	public gui!: Gui;

	constructor(private universe: Universe) {
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

	public centerWidth!: number;
	public centerHeight!: number;

	reset() {
		this.ctx.fillStyle = Global.BACKGROUND_COLOR;
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
	}

	public transform() {
		this.ctx.translate(this.centerWidth, this.centerHeight);
		this.ctx.scale(this.camera.zoom, this.camera.zoom);
		const [x, y] = this.camera.offset();
		this.ctx.translate(x, y);
	}

	public renderPlace() {
		this.ctx.save();
		this.content.astroPlace.transform();
		this.content.astroPlace.render(this.content.place.selected);
		this.ctx.restore();
	}

	onStart = true;
	render(): void {
		if (this.onStart) {
			this.onStart = false;
			setInterval(() => this.guiUpdate(), Global.GUI_FRAMERATE);
		}
		this.reset();

		if (this.time.iterations != 0) {
			this.time.update(this.universe, this.trail);
			if (this.tracker.following) this.tracker.follow(this.tracker.following);
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

		this.renderPlace();
		//Rerender
		requestAnimationFrame(() => this.render());
	}

	guiUpdate() {
		if (this.content.place.selected)
			this.content.place.updateControllersToSelected(
				this.content.create.Controllers,
				this.content.place.selected.properties
			);

		if (this.content.TimeTextBox && !this.content.TimeTextBox.focused)
			this.content.TimeTextBox.text = this.time.iterations.toString();
	}

	static ToHex(rgb: number) {
		const hex = rgb.toString(16);
		return hex.length == 1 ? "0" + hex : hex;
	}
}
