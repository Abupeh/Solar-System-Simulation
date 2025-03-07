import { CelestialBody } from "../container/CelestialBody.js";
export class Moon extends CelestialBody {
    static name = "Moon";
    constructor(body, types) {
        super(body, types);
    }
    static placeConfig = {
        mass: 500,
        radius: 300,
        color: "#c9c9c9",
        velocity: [0, 0],
    };
    static qualities = {};
    static types = ["Dwarf"];
    hasQuality(type) {
        return this.currentTypes.includes(type);
    }
}
