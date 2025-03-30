import { Kinematics } from "../modules/Kinematics.js";
import { Vector } from "../modules/Vector.js";
import { AstroObject } from "../components/astro/AstroObject.js";
export class Universe {
    name;
    format;
    static Default = "-B1.0$consice";
    static Modern = "-L1.1$precise";
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
    updateTrails(trail, iterate) {
        this.astroObjects.forEach((astroObject) => {
            trail.updateTrail(astroObject, iterate);
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
                const astroObject = new AstroObject(this.format, new Kinematics(new Vector(preciseAstroBody.kinematics.position.x, preciseAstroBody.kinematics.position.y), new Vector(preciseAstroBody.kinematics.velocity.x, preciseAstroBody.kinematics.velocity.y)));
                Object.assign(astroObject.properties, structuredClone(preciseAstroBody.properties));
                this.appendObject(astroObject);
        }
    }
    update(body) {
        body.update(this.astroObjects);
    }
    append(kinematics, properties) {
        const astroObject = new AstroObject(this.format, new Kinematics(new Vector(...kinematics.position), kinematics.velocity && new Vector(...kinematics.velocity)));
        Object.assign(astroObject.properties, structuredClone(properties));
        this.astroObjects.push(astroObject);
    }
    appendObject(astroObject) {
        this.astroObjects.push(astroObject);
    }
    downloadUniverse() {
        const astroObjects = this.astroObjects.map(({ trail, ...astroObject }) => astroObject);
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
