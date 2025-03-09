import { Config } from "../config/config.js";
import { CelestialBody } from "../container/CelestialBody.js";
export class Star extends CelestialBody {
    static name = "Star";
    astroids = [];
    constructor(body, types) {
        super(body, types);
        if (this.hasQuality("Giant")) {
            this.mass *= Config.GIANT_RADIUS;
            this.radius *= Config.GIANT_RADIUS;
        }
        if (this.hasQuality("Neutron")) {
            this.mass *= Config.NEUTRON_MASS;
            this.radius *= Config.NEUTRON_RADIUS;
        }
        if (this.hasQuality("SuperGiant")) {
            this.mass *= this.radius * Config.SUPERGIANT_RATIO;
        }
        if (this.hasQuality('HyperGiant')) {
            this.mass *= Config.HYPERGIANT_MASS;
            this.radius *= Config.HYPERGIANT_RADIUS;
        }
    }
    static placeConfig = {
        mass: 15000,
        radius: 10000,
        color: "#FFFAA0",
        velocity: [0, 0],
    };
    static qualities = {};
    static types = [
        "Dwarf",
        "Giant",
        "Neutron",
        "SuperGiant",
        "HyperGiant",
    ];
    hasQuality(type) {
        return this.types.includes(type);
    }
}
