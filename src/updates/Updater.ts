import { SolarSystem } from "../components/SolarSystem.js";
import { Vector } from "../components/Vector.js";
import { Config } from "../config/config.js";
import { CelestialBody } from "../container/CelestialBody.js";

export class Updater {
	public pause = false;
	private time = Config.ITERATIONS;
	constructor(public solarSystem: SolarSystem) {
		this.setupEventListeners();
	}
	public update(
		bodies: CelestialBody[],
		ignorePause = false,
		reversalBody?: CelestialBody
	) {
		if (this.pause && !ignorePause) return;

		
		for (let i = 0; i < Config.ITERATIONS; i++) {
			bodies.forEach((body) => (body.velocity = body.updateVelocities(bodies)));
			bodies.forEach((body) => (body.position = body.updatePositions()));
		}
		
		//Update Trail
		if (reversalBody) return reversalBody.updateTrail(ignorePause);
		bodies.forEach((body) => body.updateTrail());
	}

	private setupEventListeners(): void {
		window.addEventListener("keydown", this.keydown.bind(this));
	}

	public updateIterations(body: CelestialBody) {
		body.trail = [];
		const saveState = JSON.stringify(this.solarSystem.bodies);
		for (let i = 0; i < Config.MAX_ITERATIONS; i++)
			this.update(this.solarSystem.bodies, true, body);
		const finalSaveState = JSON.parse(saveState);
		this.solarSystem.bodies.forEach((body, i) => {
			body.position = new Vector([
				finalSaveState[i].position.x,
				finalSaveState[i].position.y,
			]);
			body.velocity = new Vector([
				finalSaveState[i].velocity.x,
				finalSaveState[i].velocity.y,
			]);
		});
	}

	holdpauses: CelestialBody[] = []

	private keydown(key: KeyboardEvent) {
		switch (key.key) {
			case " ":
				this.pause = !this.pause;
				if (this.holdpauses) {
					this.holdpauses.forEach((body) => body.trail = []);
					this.holdpauses = [];
				}
				break;
			case "ArrowUp":
				Config.ITERATIONS = this.time += 1;
				break;
			case "ArrowDown":
				if (Config.ITERATIONS > 1) Config.ITERATIONS = this.time -= 1;
				break;
		}
	}
}
