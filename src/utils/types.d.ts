import { Vector } from "../components/Vector";
import { BlackHole } from "../elements/BlackHole";
import { Star } from "../elements/Star";
import { Planet } from "../elements/Planet";
import { Moon } from "../elements/Moon";
import { TextBox } from "../ui/elements/TextBox";
import { Button } from "../ui/elements/Button";
import { Container } from "../ui/elements/Container";
export interface CelestialBodyData {
	ignore?: boolean;
	name: string;
	color: string;
	mass: number;
	radius: number;
	position: [number, number] | Vector;
	velocity: [number, number] | Vector;
	types: string[]
}

export interface SystemData {
	stars: CelestialBodyData[];
	planets: CelestialBodyData[];
	moons: CelestialBodyData[];
	blackholes: CelestialBodyData[];
}
export type GuiElement = TextBox | Button | Container;
export type CelestialBodyType = BlackHole | Star | Planet | Moon
export type CelestialBodyString = "BlackHole" | "Star" | "Planet" | "Moon"
