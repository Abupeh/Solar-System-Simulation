import { CelestialBody } from "../container/CelestialBody.js";
export class Star extends CelestialBody {
    static name = "Star";
    astroids = [];
    constructor(body, types) {
        super(body, types);
    }
    static placeConfig = {
        mass: 15000,
        radius: 10000,
        color: "#FFFAA0",
        velocity: [0, 0],
    };
    static qualities = {};
    static types = ["Dwarf", "Giant", "Neutron", "SuperGiant", "HyperGiant"];
    hasQuality(type) {
        return this.currentTypes.includes(type);
    }
}
