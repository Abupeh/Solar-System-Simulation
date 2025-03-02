import { CelestialBody } from "../container/CelestialBody.js";
import { Moon } from "./Moon.js";
import { CelestialBodyData } from "../utils/types.js";

export class Planet extends CelestialBody {
	moons: Moon[] = [];

	constructor(body: CelestialBodyData) {
		super(body);
	}
}
