import { Universe } from "../core/Universe";
import { Global } from "../global/Global";
import { Trail } from "../display/base/Trail";

export class Time {
	static ITERATIONS = 3;

	public elapsed = 0;
	public iterations = Time.ITERATIONS;
	public pausedIterations: number | null = null; //? null means unpaused
	constructor(private global: Global) {
		this.global.event.keydown(" ", this.pause.bind(this));
		this.global.event.keydown("ArrowUp", this.speedUp.bind(this));
		this.global.event.keydown("ArrowDown", this.slowDown.bind(this));
	}

	update(universe: Universe, trail: Trail, iterate: boolean) {
		if(iterate) {
			for(let i = 0; i < this.iterations; i++) {
				universe.updateAstroObjects();
				universe.updateTrails(trail, iterate);
			}
			return;
		}
		for (let i = 0; i < this.iterations; i++) {
			universe.updateAstroObjects();
		}
		if (this.iterations != 0) universe.updateTrails(trail, iterate);
	}

	onUnPauseCallback = () => {};
	onUnPause(callback: () => void) {
		this.onUnPauseCallback = callback;
	}
	pause(forcePause = false) {
		if (!this.pausedIterations || forcePause) {
			if(this.iterations) this.pausedIterations = this.iterations;
			this.iterations = 0;
			return;
		}
		this.onUnPauseCallback();
		this.onUnPauseCallback = () => {};

		this.iterations = this.pausedIterations || this.iterations;
		this.pausedIterations = null;
	}
	speedUp() {
		this.iterations++;
	}
	slowDown() {
		if (this.iterations > 1) this.iterations--;
	}
}
