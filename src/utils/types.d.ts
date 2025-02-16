export interface CelestialBodyData {
	name: string;
	mass: number;
	radius: number;
	color: string;
	position: [number, number];
	velocity: [number, number];
	moons?: MoonData[];
	astroids?: AstroidData;
}

export type AstroidData = {
	count: number;
	distance: number;
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
	orbitalDistance: [number, number];
	orbitalVelocity: [number, number];
}
