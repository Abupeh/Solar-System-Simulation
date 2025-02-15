export interface CelestialBodyData {
	name: string;
	mass: number;
	radius: number;
	color: string;
	position: [number, number];
	velocity: [number, number];
	moons?: MoonData[];
}

export interface SystemData {
	appliedToMiddle: boolean;
	stars: CelestialBodyData[];
	planets: CelestialBodyData[];
}

export interface MoonData {
	name: string;
	mass: number;
	radius: number;
	color: string;
	orbitalDistance: number;
	orbitalSpeed: number;
}
