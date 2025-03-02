import { Canvas } from "./ui/Canvas.js";
import { SolarSystem } from "./components/SolarSystem.js";
import { Vector } from "./components/Vector.js";
import { fetchCelestialData } from "./utils/fetchCelestialData.js";
import { Updater } from "./updates/Updater.js";
import { Config } from "./config/config.js";
import { Gui } from "./ui/Gui.js";

const solarSystem = new SolarSystem(new Vector([0, 0]));
const celestialData = await fetchCelestialData(Config.EXPERIMENTS[Config.SELECT]);
solarSystem.importBodies(celestialData);

const canvas = new Canvas(new Updater(solarSystem), new Gui(solarSystem));
canvas.render(solarSystem);