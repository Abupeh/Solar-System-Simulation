import { AstroObject } from "../astro/AstroObject.js";
import { AstroSet } from "../class/AstroSet.js";

export class Planet extends AstroSet<typeof Planet.details> {
	static createDefaults() {
		return {
			
		}
	}
	public readonly display = "Planet";
	static details = {
		type: ["Terrestrial", "Gas", "Ice", "Giant", "Dwarf"],
		rings: {
			rings: false,
			color: "#c9c9c9",
			size: 100,
			thickness: 10,
		},
		atmosphere: {
			atmosphere: false,
			composition: ["N2", "O2"],
			color: "#c9c9c9",
			density: 100,
			pressure: 1000,
		},
		magneticField: 0,
		tectonicActivity: 0,
		volcanism: 0,
		habitability: 0,
	};
	static defaults = {};
	defaults = Planet.defaults;

	constructor(variables = structuredClone(Planet.details)) {
		super(variables);
	}
	update() {}
	create(astroObject: AstroObject): void {}
}
