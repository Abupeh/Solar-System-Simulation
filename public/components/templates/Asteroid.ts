import { AstroObject } from "../astro/AstroObject.js";
import { AstroSet } from "../class/AstroSet.js";

export class Astroid extends AstroSet<typeof Astroid.details> {
	public readonly display = "Astroid";
	static details = {
		type: ["Astroid", "Comet"],
		composition: ["Carbonaceous", "Silicaceous", "Metallic"],
		tailLength: 0,
		nucleusSize: 0,
	};
	static defaults = {
	};
	defaults = Astroid.defaults;
	constructor(variables = structuredClone(Astroid.details)) {
		super(variables);
	}
	update() {

	}
	create(astroObject: AstroObject): void {
		
	}
}
