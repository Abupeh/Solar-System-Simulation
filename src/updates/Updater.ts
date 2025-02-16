import { SolarSystem } from "../components/SolarSystem";
import { CelestialBody } from "../container/CelestialBody";

export class Updater {
	constructor(public solarSystem: SolarSystem) {}
	public update(body: CelestialBody): void {
		body.update(this.solarSystem.bodies);
		console.log(this.solarSystem.bodies.find((b) => b.name === 'Astroid 1'));
	}
}
