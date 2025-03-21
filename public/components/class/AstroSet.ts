import { AstroProperties } from "../astro/AstroObject.d.js";
import { AstroObject } from "../astro/AstroObject";

export type AstroSetTypes = { type: string[] };

export abstract class AstroSet<T extends AstroSetTypes> {
	public abstract readonly display: string;
	constructor(public variables: T) {}
	abstract update(astroObject: AstroObject): void;
	abstract create(astroObject: AstroObject): void;
}
