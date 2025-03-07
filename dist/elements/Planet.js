import { CelestialBody } from "../container/CelestialBody.js";
export class Planet extends CelestialBody {
    static name = "Planet";
    moons = [];
    constructor(body, types) {
        super(body, types);
        if (this.hasQuality("Ice")) {
        }
    }
    static placeConfig = {
        mass: 1500,
        radius: 1000,
        color: "#92ff9c",
        velocity: [0, 0],
    };
    static types = ["Dwarf", "Gas", "Ice", "Giant", "Super-Earth", "Terrestrial"];
    static qualities = {};
    hasQuality(type) {
        return this.currentTypes.includes(type);
    }
}
