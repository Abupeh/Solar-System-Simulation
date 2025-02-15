import { Vector } from "../Vector.js";
import { CelestialBody } from "../CelestialBody.js";
import { Moon } from "./Moon.js";
import { Physics } from "../Physics.js";

export class Planet extends CelestialBody {
    moons: Moon[] = [];

    constructor(
        mass: number,
        radius: number,
        color: string,
        initialPosition: Vector,
        initialVelocity: Vector
    ) {
        super(mass, radius, color, initialPosition, initialVelocity);
    }

    update(bodies: CelestialBody[]): void {
        Physics.applyGravitationalForces(this, bodies);
        Physics.updatePosition(this);
    }
}