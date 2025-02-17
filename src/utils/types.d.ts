import { Vector } from "../components/Vector";

export interface CelestialBodyData {
	ignore?: boolean;
	name: string;
	mass: number;
	radius: number;
	color: string;
	position: [number, number] | Vector;
	velocity: [number, number] | Vector;
	moons?: MoonData[];
}

export interface SystemData {
	stars: CelestialBodyData[];
	planets: CelestialBodyData[];
}

export interface MoonData {
	ignore?: boolean;
	name: string;
	mass: number;
	radius: number;
	color: string;
	orbitalDistance: [number, number];
	orbitalVelocity: [number, number];
}
