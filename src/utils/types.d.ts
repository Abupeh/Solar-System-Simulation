import { Vector } from "../components/Vector";
import { BlackHole } from "../elements/BlackHole";
import { Star } from "../elements/Star";
import { Planet } from "../elements/Planet";
import { Moon } from "../elements/Moon";


export interface CelestialBodyData {
	ignore?: boolean;
	name: string;
	color: string;
	mass: number;
	radius: number;
	position: [number, number] | Vector;
	velocity: [number, number] | Vector;
}

export interface SystemData {
	stars: CelestialBodyData[];
	planets: CelestialBodyData[];
	moons: CelestialBodyData[];
}

export type CelestialBodyType = BlackHole | Star | Planet | Moon
export type CelestialBodyString = "BlackHole" | "Star" | "Planet" | "Moon"

export interface MoonData {
	ignore?: boolean;
	name: string;
	color: string;
	mass: number;
	radius: number;
	orbitalDistance: [number, number];
	orbitalVelocity: [number, number];
}
