export type UniverseData = AstroObjectArray | AstroObjectBodyList;

export type AstroObjectArray = {
	format: UniverseFormat;
	AstroObjects?: VersionalAstroData[];
};
export type AstroObjectBodyList = {
	format: UniverseFormat;
	stars?: VersionalAstroData[];
	planets?: VersionalAstroData[];
	moons?: VersionalAstroData[];
	blackholes?: VersionalAstroData[];
};

export type PropertyFormat = "consice" | "kinematic" | "precise";
export type VersionFormat = "1.0" | "1.1" | ":vague";
export type AstroObjectFormat = "-L" | "-B";

export type UniverseFormat =
	`${AstroObjectFormat}${VersionFormat}$${PropertyFormat}`;

export type OrganizedFormat = [AstroObjectFormat, VersionFormat, PropertyFormat];