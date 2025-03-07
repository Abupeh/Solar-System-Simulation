import { CelestialBody } from "../container/CelestialBody.js";
import { Moon } from "./Moon.js";
import { CelestialBodyData, CelestialBodyString } from "../utils/types.js";
import { Physics } from "../components/Physics.js";

export class Planet extends CelestialBody {
	static name = "Planet" as CelestialBodyString;
	moons: Moon[] = [];

	constructor(body: CelestialBodyData, types?: string[]) {
		super(body, types);

		if(this.hasQuality("Ice")) {

		}
	}

	static placeConfig = {
		mass: 1500,
		radius: 1000,
		color: "#92ff9c",
		velocity: [0, 0],
	} as CelestialBodyData;


	static types = ["Dwarf", "Gas", "Ice", "Giant", "Super-Earth", "Terrestrial"]
	static qualities = {

	}

	hasQuality(type: typeof Planet.types[number]) {
		return this.currentTypes.includes(type)
	}
}
