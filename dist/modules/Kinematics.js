import { Vector } from "./Vector.js";
export class Kinematics {
    position;
    velocity;
    static UNIVERSAL_GRAVITY = 0.0087;
    static UNIVERSAL_FORCE = 10;
    static UNIVERSAL_VELOCITY = 20;
    constructor(position = new Vector(0, 0), velocity = new Vector(0, 0)) {
        this.position = position;
        this.velocity = velocity;
    }
    applyGravitationalForce(astroObjects, thisObject) {
        let surfaceTemperature = 0;
        for (const { kinematics, properties } of astroObjects) {
            if (this == kinematics)
                continue;
            const distance = Vector.distance(kinematics.position, this.position);
            const force = Vector.normalize(distance);
            force
                .scale(Kinematics.UNIVERSAL_GRAVITY *
                thisObject.properties.mass *
                properties.mass *
                properties.gravity)
                .scale(1 / distance.magnitude)
                .scale(1 / thisObject.properties.mass)
                .scale(Kinematics.UNIVERSAL_FORCE);
            this.velocity.add(force);
            thisObject.properties.spin -=
                (force.x + force.y) * thisObject.properties.density;
            surfaceTemperature +=
                properties.luminosity /
                    (distance.magnitude / thisObject.properties.radius ** 2);
            surfaceTemperature +=
                (properties.magneticField * thisObject.properties.metallicity) /
                    (distance.magnitude /
                        thisObject.properties.radius ** 2 /
                        Kinematics.UNIVERSAL_GRAVITY);
            thisObject.properties.charge += Math.abs(surfaceTemperature * thisObject.properties.radius);
        }
        thisObject.properties.coreTemperature +=
            (-thisObject.properties.coreTemperature +
                thisObject.properties.charge *
                    ((thisObject.properties.nucleusSize / thisObject.properties.radius) *
                        Kinematics.UNIVERSAL_GRAVITY)) /
                2;
        thisObject.properties.surfaceTemperature +=
            (-thisObject.properties.surfaceTemperature +
                thisObject.properties.coreTemperature +
                surfaceTemperature -
                thisObject.properties.atmosphere.pressure * thisObject.properties.density) /
                2;
        thisObject.properties.density +=
            -thisObject.properties.density +
                thisObject.properties.mass / thisObject.properties.radius / 2;
        if (thisObject.properties.spin > 360)
            thisObject.properties.spin = 0;
        if (thisObject.properties.spin < 0)
            thisObject.properties.spin = 360;
    }
    applyPositionalForce() {
        const velocity = Vector.amplitude(this.velocity, Kinematics.UNIVERSAL_VELOCITY);
        this.position.add(velocity);
    }
}
