import { Config } from "../config/config.js";
export class Updater {
    solarSystem;
    canvas;
    pause = false;
    time = Config.TIME_STEP;
    constructor(solarSystem) {
        this.solarSystem = solarSystem;
        this.setupEventListeners();
    }
    update(body) {
        body.update(this.solarSystem.bodies);
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
                Config.TIME_STEP = this.time -= 1;
                break;
        }
        console.log(Config.TIME_STEP);
    }
}
