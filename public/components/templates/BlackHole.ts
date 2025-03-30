import { AstroObject } from "../astro/AstroObject.js";
import { AstroSet } from "../class/AstroSet.js";


//! Remove public defaults

export class BlackHole extends AstroSet<typeof BlackHole.details> {
	static createDefaults() {
		return {
			
		}
	}
	public readonly display = "BlackHole";
	static details = {
		type: ["Stellar", "Intermediate", "SuperMassive", "Primordial"],
		eventHorizonRadius: 0,
		spin: 0,
		charge: 0,
		accretionDisk: true,
		hawkingRadiation: false,
		gravitationalLensing: true,
	};
	static defaults = {
		mass: 100000,
		color: "#303030",
	};
	defaults = BlackHole.defaults;

	constructor(variables = structuredClone(BlackHole.details)) {
		super(variables);
	}
	update() {
		
	}
	create(astroObject: AstroObject): void {
		
	}
}
