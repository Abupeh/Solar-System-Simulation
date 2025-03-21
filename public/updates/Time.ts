import { Universe } from "../core/Universe";
import { Global } from "../global/Global";
import { Trail } from "../display/base/Trail";

export class Time {
	static ITERATIONS = 3;

	public elapsed = 0;
	public iterations = Time.ITERATIONS;
	public pausedIterations: number | null = null; //? null means unpaused
	constructor(private display: Global) {
		this.display.event.keydown(" ", this.pause.bind(this));
		this.display.event.keydown("ArrowUp", this.speedUp.bind(this));
		this.display.event.keydown("ArrowDown", this.slowDown.bind(this));
	}

	update(universe: Universe, trail: Trail) {
		for (let i = 0; i < this.iterations; i++) {
			universe.updateAstroObjects();
		}
		if (this.iterations != 0) universe.updateTrails(trail);
	}
	pause() {
		if (!this.pausedIterations) {
			this.pausedIterations = this.iterations;
			this.iterations = 0;
			return;
		}

		this.iterations = this.pausedIterations;
		this.pausedIterations = null;
	}
	speedUp() {
		this.iterations++;
	}
	slowDown() {
		if (this.iterations > 1) this.iterations--;
	}
}
