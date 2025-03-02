import { Config } from "../config/config.js";
export class Updater {
    solarSystem;
    pause = false;
    time = Config.TIME_STEP;
    constructor(solarSystem) {
        this.solarSystem = solarSystem;
        this.setupEventListeners();
    }
    update(bodies) {
        bodies.forEach((body) => body.updateVelocities(bodies));
        bodies.forEach((body) => body.updatePositions());
    }
    setupEventListeners() {
        window.addEventListener("keydown", this.keydown.bind(this));
    }
    keydown(key) {
        switch (key.key) {
            case " ":
                this.pause = !this.pause;
                if (this.pause)
                    Config.TIME_STEP = 0;
                else
                    Config.TIME_STEP = this.time;
                break;
            case "ArrowUp":
                Config.TIME_STEP = this.time += 1;
                break;
            case "ArrowDown":
                if (Config.TIME_STEP > 1)
                    Config.TIME_STEP = this.time -= 1;
                break;
        }
    }
}
