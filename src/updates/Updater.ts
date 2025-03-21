import { SolarSystem } from "../components/SolarSystem.js";
import { Vector } from "../components/Vector.js";
import { Config } from "../config/config.js";
import { CelestialBody } from "../container/CelestialBody.js";

export class Updater {
	public pause = false;
	private time = Config.ITERATIONS;
	previousBody: [number, number] = [0, 0];
	constructor(public solarSystem: SolarSystem) {
		this.setupEventListeners();
	}

	firstFollowing = [0, 0];
	followingBody: CelestialBody | null = null;
	public update(
		bodies: CelestialBody[],
		ignorePause = false,
		reversalBody?: CelestialBody
	) {
		if (this.pause && !ignorePause) return;

		this.previousBody[0] = this.followingBody?.position.x as number;
		this.previousBody[1] = this.followingBody?.position.y as number;

		for (let i = 0; i < Config.ITERATIONS; i++) {
			bodies.forEach((body) => (body.velocity = body.updateVelocities(bodies)));
			bodies.forEach((body) => (body.position = body.updatePositions()));
		}

		//Update Trail
		bodies.forEach((body) =>
			body.updateTrail(
				ignorePause,
				this.followingBody,
				this.previousBody,
				this.referenceMode
			)
		);
	}

	referenceMode = false;

	private setupEventListeners(): void {
		window.addEventListener("keydown", this.keydown.bind(this));
	}

	public updateIterations(body: CelestialBody) {
		const saveState = JSON.stringify(this.solarSystem.bodies);
		this.solarSystem.bodies.forEach((body) => (body.trail = []));
		this.firstFollowing = [
			this.followingBody?.position.x || 0,
			this.followingBody?.position.y || 0,
		];
		for (let i = 0; i < Config.MAX_ITERATIONS; i++)
			this.update(this.solarSystem.bodies, true, body);

		if (this.referenceMode)
			this.solarSystem.bodies.forEach((body) =>
				body.trail.forEach((trailpiece) => {
					trailpiece[0] -=
						(this.followingBody?.position.x as number) - this.firstFollowing[0];
					trailpiece[1] -=
						(this.followingBody?.position.y as number) - this.firstFollowing[1];
				})
			);
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

	holdpauses: CelestialBody[] = [];

	private keydown(key: KeyboardEvent) {
		switch (key.key) {
			case " ":
				this.pause = !this.pause;
				if (this.holdpauses) {
					this.holdpauses.forEach((body) => (body.trail = []));
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
