import { CelestialBody } from "../container/CelestialBody.js";
import { CelestialBodyData, MoonData } from "../utils/types.js";
import { Vector } from "../components/Vector.js";

export class Moon extends CelestialBody {
	constructor(body: CelestialBodyData);
	constructor(body: MoonData, planet: CelestialBody);
	constructor(body: MoonData | CelestialBodyData, planet?: CelestialBody) {
		if (!planet) {
			super(body as CelestialBodyData);
			return;
		}
		const moonbody = body as MoonData;
		const planetbody = planet as CelestialBody;
		super({
			...body,
			position: new Vector(moonbody.orbitalDistance).add(planetbody.position),
			velocity: new Vector(moonbody.orbitalVelocity).add(planetbody.velocity),
		});
	}
}
