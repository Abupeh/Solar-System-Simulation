export class Time {
    global;
    static ITERATIONS = 10;
    elapsed = 0;
    iterations = Time.ITERATIONS;
    pausedIterations = null; //? null means unpaused
    constructor(global) {
        this.global = global;
        this.global.event.keydown(" ", this.pause.bind(this));
        this.global.event.keydown("ArrowUp", this.speedUp.bind(this));
        this.global.event.keydown("ArrowDown", this.slowDown.bind(this));
    }
    update(universe, trail) {
        for (let i = 0; i < this.iterations; i++) {
            universe.updateAstroObjects();
        }
        if (this.iterations != 0)
            universe.updateTrails(trail);
    }
    onUnPauseCallback = () => { };
    onUnPause(callback) {
        this.onUnPauseCallback = callback;
    }
    pause(forcePause = false) {
        if (!this.pausedIterations || forcePause || (this.iterations != 0)) {
            if (this.iterations)
                this.pausedIterations = this.iterations;
            this.iterations = 0;
            return;
        }
        this.onUnPauseCallback();
        this.onUnPauseCallback = () => { };
        this.iterations = this.pausedIterations || this.iterations;
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
