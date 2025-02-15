import { CelestialBody } from "../CelestialBody.ts";
import { Vector } from "../Vector.ts";
export declare class Moon extends CelestialBody {
    constructor(mass: number, radius: number, color: string, initialPosition: Vector, initialVelocity: Vector);
    update(bodies: CelestialBody[]): void;
}
