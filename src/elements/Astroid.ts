import { CelestialBody } from "../container/CelestialBody.js";
import { Moon } from "./Moon.js";
import { Physics } from "../components/Physics.js";
import { Config } from "../config/config.js";
import { Star } from "./Star.js";

export class Astroid extends CelestialBody {
	static astroidCount = 0;

	constructor(star: Star, distance: number) {
		Astroid.astroidCount++;
		const splitDistance = Astroid.splitDistance(distance);
		super({
			name: `Astroid ${Astroid.astroidCount}`,
			mass: Astroid.randomAstroid(),
			radius: Astroid.randomAstroid(),
			color: Config.ASTROID_COLOR,
			position: [
				star.position.x +
					splitDistance *
						Astroid.negative() +
						(Astroid.randomAstroid() * Config.ASTROID_DISTANCE),
				star.position.y +
					(distance - splitDistance) *
						Astroid.negative() +
						(Astroid.randomAstroid() * Config.ASTROID_DISTANCE),
			],
			velocity: [0, 0],
		});
	}

	static splitDistance(distance: number) {
		return Math.random() * distance;
	}

	static negative() {
		return Math.random() < 0.5 ? -1 : 1;
	}

	static randomAstroid() {
		return (
			Math.floor(Math.random() * (Config.ASTROID_MAX - Config.ASTROID_MIN)) +
			Config.ASTROID_MIN
		);
	}

	update(bodies: CelestialBody[]): void {
		Physics.applyGravitationalForces(this, bodies, Config.ASTROID_SELFGRAVITY);
		Physics.updatePosition(this);
	}
}
