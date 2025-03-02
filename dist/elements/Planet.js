import { CelestialBody } from "../container/CelestialBody.js";
export class Planet extends CelestialBody {
    moons = [];
    constructor(body) {
        super(body);
    }
}
