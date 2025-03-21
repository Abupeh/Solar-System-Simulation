export var AstroType;
(function (AstroType) {
    AstroType["BlackHole"] = "BlackHole";
    AstroType["Star"] = "Star";
    AstroType["Planet"] = "Planet";
    AstroType["Moon"] = "Moon";
})(AstroType || (AstroType = {}));
// type SpecralType = "O" | "B" | "A" | "F" | "G" | "K" | "M"
export class AstroObject {
    kinematics;
    static count = 0;
    static createName(type) {
        return type + "-" + AstroObject.count++;
    }
    type = AstroType.Planet;
    name = AstroObject.createName(this.type);
    radius = 20;
    gravity = 1;
    get density() {
        return this.kinematics.mass / this.radius;
    }
    surfaceTemperature = 0; //!
    age = 0; //!
    color = "#AABBCC";
    trail = [];
    constructor(kinematics, properties) {
        this.kinematics = kinematics;
        Object.assign(this, properties);
    }
    update(astroObjects) {
        this.kinematics.applyGravitationalForce(astroObjects, this.gravity);
        this.kinematics.applyPositionalForce();
    }
}
