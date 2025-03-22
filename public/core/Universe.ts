import { Kinematics } from "../modules/Kinematics.js";
import { Vector } from "../modules/Vector.js";
import { Trail } from "../display/base/Trail.js";
import type {
	AstroData,
	AstroDataTyped,
	AstroProperties,
	AstroTemplates,
	ConsiceAstroData,
	KinematicsAstroData,
	KinematicsData,
	PreciseAstroData,
	VersionalAstroData,
} from "../components/astro/AstroObject.d.js";
import { Astro, AstroObject } from "../components/astro/AstroObject.js";
import type {
	AstroObjectArray,
	AstroObjectBodyList,
	OrganizedFormat,
	PropertyFormat,
	UniverseData,
	UniverseFormat,
	VersionFormat,
} from "./Universe.d.js";
import { AstroSet } from "../components/class/AstroSet.js";

type UniverseFolder = "tests" | "data";
export class Universe {
	static Default: UniverseFormat = "-B1.0$consice";
	static Modern: UniverseFormat = "-L:vague$kinematic";

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

	updateTrails(trail: Trail) {
		this.astroObjects.forEach((astroObject) => {
			trail.updateTrail(astroObject);
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
				AstroObjects?.forEach((body) => this.appendBody(body, format, body.template));
				break;
			case "-B":
				const { blackholes, stars, planets, moons } = data as AstroObjectBodyList;
				blackholes?.forEach((body) => this.appendBody(body, format, 'BlackHole'));
				stars?.forEach((body) => this.appendBody(body, format, 'Star'));
				planets?.forEach((body) => this.appendBody(body, format, 'Planet'));
				moons?.forEach((body) => this.appendBody(body, format, 'Moon'));
		}
	}

	private appendBody(body: VersionalAstroData, format: OrganizedFormat, template: AstroTemplates) {
		const astroObject = this.assertBodyVersion(body, format[1]);
		this.appendBodyProperty(astroObject, format[2], template);
	}

	private assertBodyVersion(body: VersionalAstroData, version: VersionFormat) {
		switch (version) {
			case "1.0":
			case ":vague":
				return body as AstroData;
			case "1.1":
				return body as AstroDataTyped;
		}
	}

	private appendBodyProperty(
		body: VersionalAstroData,
		property: PropertyFormat,
		template: AstroTemplates
	) {
		switch (property) {
			case "consice":
				const consiceAstroBody = body as ConsiceAstroData;
				this.append(consiceAstroBody, consiceAstroBody, Astro[template]());
				break;
			case "kinematic":
				const { kinematics, properties } = body as KinematicsAstroData;
				this.append(kinematics, properties, Astro[template]());
				break;
			case "precise":
				const preciseAstroBody = body as PreciseAstroData;
				throw new Error("Precise-Format Not Supported");
		}
	}

	update(body: AstroObject) {
		body.update(this.astroObjects);
	}

	append(
		kinematics: KinematicsData,
		properties: AstroProperties | ConsiceAstroData | PreciseAstroData,
		set: AstroSet<any>
	) {
		this.astroObjects.push(
			new AstroObject(
				this.format,
				new Kinematics(
					new Vector(...kinematics.position),
					kinematics.velocity && new Vector(...kinematics.velocity)
				),
				set,
				properties
			)
		);
	}

	appendObject(astroObject: AstroObject) {
		this.astroObjects.push(astroObject);
	}
}
