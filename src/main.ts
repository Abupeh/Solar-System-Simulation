import { Canvas } from "./ui/Canvas.js";
import { SolarSystem } from "./components/SolarSystem.js";
import { Vector } from "./components/Vector.js";
import { fetchCelestialData } from "./utils/fetchCelestialData.js";
import { Updater } from "./updates/Updater.js";
import { Star } from "./elements/Star.js";

const solarSystem = new SolarSystem(new Vector([0, 0]));
const celestialData = await fetchCelestialData("./data/celestialBodies.json");
solarSystem.importBodies(celestialData);

const canvas = new Canvas(new Updater(solarSystem));
canvas.render(solarSystem);

console.log((solarSystem.bodies[0] as Star)?.astroids)