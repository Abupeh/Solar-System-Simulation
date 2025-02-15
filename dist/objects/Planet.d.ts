import { Vector } from "../Vector.ts";
import { CelestialBody } from "../CelestialBody.ts";
import { Moon } from "./Moon.ts";
export declare class Planet extends CelestialBody {
    moons: Moon[];
    constructor(mass: number, radius: number, color: string, initialPosition: Vector, initialVelocity: Vector);
    update(bodies: CelestialBody[]): void;
}
