import { CelestialBody } from "./CelestialBody.ts";
export declare class Physics {
    static applyGravitationalForces(body: CelestialBody, bodies: CelestialBody[]): void;
    static updatePosition(body: CelestialBody): void;
}
