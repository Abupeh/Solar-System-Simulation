import { SolarSystem } from "../components/SolarSystem.js";
import { Config } from "../config/config.js";
import { CelestialBody } from "../container/CelestialBody.js";

export class Updater {
	public pause = false;
	private time = Config.TIME_STEP;
	constructor(public solarSystem: SolarSystem) {
		this.setupEventListeners();
	}
	public update(bodies: CelestialBody[]): void {
		bodies.forEach((body) => body.updateVelocities(bodies));
		bodies.forEach((body) => body.updatePositions());
	}

	private setupEventListeners(): void {
		window.addEventListener("keydown", this.keydown.bind(this));
	}

	private keydown(key: KeyboardEvent) {
		switch(key.key) {
			case " ":
				this.pause = !this.pause;
				if (this.pause) Config.TIME_STEP = 0;
				else Config.TIME_STEP = this.time;	
			break;
			case "ArrowUp":
				Config.TIME_STEP = this.time += 1;
			break;
			case "ArrowDown":
				if(Config.TIME_STEP > 1)
				Config.TIME_STEP = this.time -= 1;
			break;
		}
	}
}
