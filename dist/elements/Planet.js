import { CelestialBody } from "../container/CelestialBody.js";
import { Config } from "../config/config.js";
import { Color } from "../utils/Color.js";
export class Planet extends CelestialBody {
    static name = "Planet";
    moons = [];
    constructor(body, types) {
        super(body, types);
        if (this.hasQuality("Giant")) {
            this.mass *= Config.GIANT_RADIUS;
            this.radius *= Config.GIANT_RADIUS;
        }
        if (this.hasQuality("Gas")) {
            this.mass *= Config.GAS_MASS;
        }
        if (this.hasQuality('Super-Earth')) {
            this.mass *= this.radius * Config.SUPER_EARTH_RATIO;
        }
        if (this.hasQuality("Terrestrial")) {
            this.mass *= Config.TERRESTRIAL_MASS;
        }
    }
    static placeConfig = {
        mass: 1500,
        radius: 1000,
        color: Color.RandomColor(),
        velocity: [0, 0],
    };
    static types = [
        "Dwarf",
        "Gas",
        "Ice",
        "Giant",
        "Super-Earth",
        "Terrestrial",
    ];
    static qualities = {};
    hasQuality(type) {
        return this.types.includes(type);
    }
}
