import { CelestialBody } from "../container/CelestialBody.js";
export class BlackHole extends CelestialBody {
    static name = "BlackHole";
    constructor(body, types) {
        super(body, types);
    }
    static placeConfig = {
        mass: 9999999,
        radius: 99999,
        color: "#010110",
        velocity: [0, 0],
    };
    static qualities = {};
    static types = [
        "Stellar",
        "Intermediate",
        "SuperMassive",
        "Primordial",
    ];
    hasQuality(type) {
        return this.types.includes(type);
    }
}
