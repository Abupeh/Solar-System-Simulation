import { Vector } from "./Vector.ts";
export declare abstract class CelestialBody {
    mass: number;
    radius: number;
    color: string;
    position: Vector;
    velocity: Vector;
    acceleration: Vector;
    trail: Vector[];
    constructor(mass: number, radius: number, color: string, initialPosition?: Vector, initialVelocity?: Vector);
    abstract update(bodies: CelestialBody[]): void;
    draw(ctx: CanvasRenderingContext2D): void;
}
