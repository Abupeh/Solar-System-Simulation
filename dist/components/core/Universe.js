import { Kinematics } from "../../containers/Kinematics.js";
import { Vector } from "../../containers/Vector.js";
import { AstroObject, } from "./AstroObject.js";
export class Universe {
    name;
    format;
    static Default = "-B1.0$consice";
    static Modern = "-L:vague$kinematic";
    astroObjects = [];
    constructor(name = "", format) {
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
    async import(json) {
        const response = await fetch("./data/" + json + ".json");
        const data = (await response.json());
        const format = this.interpretFormat(this.format || data.format);
        this.importBodies(data, format);
        return this;
    }
    interpretFormat(format = Universe.Default) {
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
                AstroObjects?.forEach((body) => this.appendBody(body, format));
                break;
            case "-B":
                const { blackholes, stars, planets, moons } = data;
                blackholes?.forEach((body) => this.appendBody(body, format));
                stars?.forEach((body) => this.appendBody(body, format));
                planets?.forEach((body) => this.appendBody(body, format));
                moons?.forEach((body) => this.appendBody(body, format));
        }
    }
    appendBody(body, format) {
        const astroObject = this.assertBodyVersion(body, format[1]);
        this.appendBodyProperty(astroObject, format[2]);
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
    appendBodyProperty(body, property) {
        switch (property) {
            case "consice":
                const consiceAstroBody = body;
                this.append(consiceAstroBody, consiceAstroBody);
                break;
            case "kinematic":
                const { kinematics, properties } = body;
                this.append(kinematics, properties);
                break;
            case "precise":
                const preciseAstroBody = body;
                throw new Error("Precise Not Supported");
        }
    }
    update(body) {
        body.update(this.astroObjects);
    }
    append(kinematics, properties) {
        this.astroObjects.push(new AstroObject(new Kinematics(kinematics.mass, new Vector(...kinematics.position), new Vector(...kinematics.velocity)), properties));
    }
}
