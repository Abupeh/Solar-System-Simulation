import { Kinematics } from "../modules/Kinematics.js";
import { Vector } from "../modules/Vector.js";
import { Astro, AstroObject } from "../components/astro/AstroObject.js";
export class Universe {
    name;
    format;
    static Default = "-B1.0$consice";
    static Modern = "-L:vague$kinematic";
    astroObjects = [];
    constructor(name = "", format = Universe.Default) {
        this.name = name;
        this.format = format;
    }
    updateAstroObjects() {
        this.astroObjects.forEach((astroObject) => {
            astroObject.update(this.astroObjects);
        });
    }
    updateTrails(trail) {
        this.astroObjects.forEach((astroObject) => {
            trail.updateTrail(astroObject);
        });
    }
    async import(json, from = "data") {
        const response = await fetch(`./${from}/` + json + ".json");
        const data = (await response.json());
        const format = this.interpretFormat(data.format || this.format);
        this.importBodies(data, format);
        return this;
    }
    interpretFormat(format) {
        this.format = format;
        const isFormat = format.startsWith("-");
        if (!isFormat)
            throw Error("Format Does Not Exist");
        const [versionDetails, property] = format.split("$");
        const astroObject = versionDetails.substring(0, 2);
        const version = versionDetails.substring(2);
        return [astroObject, version, property];
    }
    importBodies(data, format) {
        switch (format[0]) {
            case "-L":
                const { AstroObjects } = data;
                AstroObjects?.forEach((body) => this.appendBody(body, format, body.template));
                break;
            case "-B":
                const { blackholes, stars, planets, moons } = data;
                blackholes?.forEach((body) => this.appendBody(body, format, 'BlackHole'));
                stars?.forEach((body) => this.appendBody(body, format, 'Star'));
                planets?.forEach((body) => this.appendBody(body, format, 'Planet'));
                moons?.forEach((body) => this.appendBody(body, format, 'Moon'));
        }
    }
    appendBody(body, format, template) {
        const astroObject = this.assertBodyVersion(body, format[1]);
        this.appendBodyProperty(astroObject, format[2], template);
    }
    assertBodyVersion(body, version) {
        switch (version) {
            case "1.0":
            case ":vague":
                return body;
            case "1.1":
                return body;
        }
    }
    appendBodyProperty(body, property, template) {
        switch (property) {
            case "consice":
                const consiceAstroBody = body;
                this.append(consiceAstroBody, consiceAstroBody, new Astro[template]());
                break;
            case "kinematic":
                const { kinematics, properties } = body;
                this.append(kinematics, properties, new Astro[template]());
                break;
            case "precise":
                const preciseAstroBody = body;
                throw new Error("Precise-Format Not Supported");
        }
    }
    update(body) {
        body.update(this.astroObjects);
    }
    append(kinematics, properties, set) {
        this.astroObjects.push(new AstroObject(this.format, new Kinematics(new Vector(...kinematics.position), kinematics.velocity && new Vector(...kinematics.velocity)), set, properties));
    }
    appendObject(astroObject) {
        this.astroObjects.push(astroObject);
    }
}
