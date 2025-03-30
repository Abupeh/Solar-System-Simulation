import { Kinematics } from "../modules/Kinematics.js";
import { Vector } from "../modules/Vector.js";
import { Trail } from "../display/base/Trail.js";
import type {
	AstroData,
	AstroProperties,
	AstroTemplates,
	ConsiceAstroData,
	KinematicsAstroData,
	KinematicsData,
	PreciseAstroData,
} from "../components/astro/AstroObject.d.js";

import type {
	AstroObjectArray,
	AstroObjectBodyList,
	OrganizedFormat,
	PropertyFormat,
	UniverseData,
	UniverseFormat,
	VersionFormat,
} from "./Universe.d.js";
import { AstroObject } from "../components/astro/AstroObject.js";

type UniverseFolder = "tests" | "data";
export class Universe {
	static Default: UniverseFormat = "-B1.0$consice";
	static Modern: UniverseFormat = "-L1.1$precise";

	public astroObjects: AstroObject[] = [];
	constructor(
		public name = "",
		public format: UniverseFormat = Universe.Default
	) {}

	updateAstroObjects() {
		this.astroObjects.forEach((astroObject) => {
			astroObject.update(this.astroObjects);
		});
	}

	updateTrails(trail: Trail, iterate: boolean) {
		this.astroObjects.forEach((astroObject) => {
			trail.updateTrail(astroObject, iterate);
		});
	}

	async import(json: string, from: UniverseFolder = "data") {
		const response = await fetch(`./${from}/` + json + ".json");
		const data = (await response.json()) as UniverseData;
		const format = this.interpretFormat(data.format || this.format);
		this.importBodies(data, format);
		return this;
	}

	interpretFormat(format: UniverseFormat) {
		this.format = format;
		const isFormat = format.startsWith("-");
		if (!isFormat) throw Error("Format Does Not Exist");
		const [versionDetails, property] = format.split("$");
		const astroObject = versionDetails.substring(0, 2);
		const version = versionDetails.substring(2);
		return [astroObject, version, property] as OrganizedFormat;
	}

	importBodies(data: UniverseData, format: OrganizedFormat) {
		switch (format[0]) {
			case "-L":
				const { AstroObjects } = data as AstroObjectArray;
				AstroObjects?.forEach((body) => this.appendBody(body, format));
				break;
			case "-B":
				const { blackholes, stars, planets, moons } = data as AstroObjectBodyList;
				blackholes?.forEach((body) => this.appendBody(body, format));
				stars?.forEach((body) => this.appendBody(body, format));
				planets?.forEach((body) => this.appendBody(body, format));
				moons?.forEach((body) => this.appendBody(body, format));
		}
	}

	private appendBody(body: AstroData, format: OrganizedFormat) {
		const astroObject = this.assertBodyVersion(body, format[1]);
		this.appendBodyProperty(astroObject, format[2]);
	}

	private assertBodyVersion(body: AstroData, version: VersionFormat) {
		switch (version) {
			case "1.0":
			case ":vague":
			case "1.1":
				return body as AstroData;
		}
	}

	private appendBodyProperty(body: AstroData, property: PropertyFormat) {
		switch (property) {
			case "consice":
				const consiceAstroBody = body as ConsiceAstroData;
				this.append(consiceAstroBody, consiceAstroBody);
				break;
			case "kinematic":
				const { kinematics, properties } = body as KinematicsAstroData;
				this.append(kinematics, properties);
				break;
			case "precise":
				const preciseAstroBody = body as PreciseAstroData;
				const astroObject = new AstroObject(
					this.format,
					new Kinematics(
						new Vector(
							preciseAstroBody.kinematics.position.x,
							preciseAstroBody.kinematics.position.y
						),
						new Vector(
							preciseAstroBody.kinematics.velocity.x,
							preciseAstroBody.kinematics.velocity.y
						)
					)
				);
				Object.assign(
					astroObject.properties,
					structuredClone(preciseAstroBody.properties)
				);
				this.appendObject(astroObject);
		}
	}

	update(body: AstroObject) {
		body.update(this.astroObjects);
	}

	append(
		kinematics: KinematicsData,
		properties: AstroProperties | ConsiceAstroData | PreciseAstroData
	) {
		const astroObject = new AstroObject(
			this.format,
			new Kinematics(
				new Vector(...kinematics.position),
				kinematics.velocity && new Vector(...kinematics.velocity)
			)
		);
		Object.assign(astroObject.properties, structuredClone(properties));
		this.astroObjects.push(astroObject);
	}

	appendObject(astroObject: AstroObject) {
		this.astroObjects.push(astroObject);
	}

	downloadUniverse() {
		const astroObjects = this.astroObjects.map(
			({ trail, ...astroObject }) => astroObject
		);
		return {
			format: Universe.Modern,
			AstroObjects: structuredClone(astroObjects),
		};
	}

	download() {
		const data = this.downloadUniverse();
		const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "universe.json";
		a.click();
		URL.revokeObjectURL(url);
	}
}
