import { CelestialBody } from "../container/CelestialBody.js";
export class Star extends CelestialBody {
    astroids = [];
    constructor(body) {
        super(body);
    }
}
