import { Canvas } from "./Canvas.js";
import { SolarSystem } from "./SolarSystem.js";
import { Vector } from "./Vector.js";
import { fetchCelestialData } from "./fetchCelestialData.js";

const canvas = new Canvas();
const solarSystem = new SolarSystem(new Vector([0, 0]));
const celestialData = await fetchCelestialData("./data/celestialBodies.json");

solarSystem.importBodies(celestialData);
solarSystem.useCanvas(canvas);
