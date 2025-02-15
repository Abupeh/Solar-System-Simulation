export declare class Vector {
    x: number;
    y: number;
    constructor(x: number, y: number);
    add(v: Vector): Vector;
    subtract(v: Vector): Vector;
    scale(scalar: number): Vector;
    magnitude(): number;
    normalize(): Vector;
    static gravitationalForce(a: Vector, b: Vector, massA: number, massB: number, G: number): Vector;
}
