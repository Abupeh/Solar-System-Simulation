export class Time {
    display;
    static ITERATIONS = 3;
    elapsed = 0;
    iterations = Time.ITERATIONS;
    pausedIterations = null; //? null means unpaused
    constructor(display) {
        this.display = display;
        this.display.event.keydown(" ", this.pause.bind(this));
        this.display.event.keydown("ArrowUp", this.speedUp.bind(this));
        this.display.event.keydown("ArrowDown", this.slowDown.bind(this));
    }
    update(universe, trail) {
        for (let i = 0; i < this.iterations; i++) {
            universe.updateAstroObjects();
        }
        if (this.iterations != 0)
            universe.updateTrails(trail);
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
        if (this.iterations > 1)
            this.iterations--;
    }
}
