import { Astro, AstroObject } from "./AstroObject";

export type AstroTemplates = keyof typeof Astro;

export interface KinematicsAstroData {
	kinematics: KinematicsData;
	properties: AstroProperties;
	template: AstroTemplates;
}

export interface KinematicsData {
	position: [number, number];
	velocity: [number, number];
}

export interface ConsiceAstroData {
	name: string;
	mass: number;
	radius: number;
	color: string;
	position: [number, number];
	velocity: [number, number];
}

export type PreciseAstroData = AstroObject;

export type AstroData =
	| KinematicsAstroData
	| ConsiceAstroData
	| PreciseAstroData;

export interface AstroProperties {
	name?: string;
	mass?: number;
	radius?: number;
	gravity?: number;
	surfaceTemperature?: number;
	age?: number;
	color?: string;
}
