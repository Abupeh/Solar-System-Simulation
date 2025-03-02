import { Vector } from "../components/Vector";

export interface CelestialBodyData {
	ignore?: boolean;
	name: string;
	color: string;
	mass: number;
	radius: number;
	position: [number, number] | Vector;
	velocity: [number, number] | Vector;
	moons?: MoonData[];
}

export interface SystemData {
	stars: CelestialBodyData[];
	planets: CelestialBodyData[];
}

export type CelestialType = "Star" | "Planet" | "Moon";

export interface MoonData {
	ignore?: boolean;
	name: string;
	color: string;
	mass: number;
	radius: number;
	orbitalDistance: [number, number];
	orbitalVelocity: [number, number];
}
