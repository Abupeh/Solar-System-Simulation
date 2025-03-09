import { Canvas } from "./ui/Canvas.js";
import { SolarSystem } from "./components/SolarSystem.js";
import { Vector } from "./components/Vector.js";
import { Updater } from "./updates/Updater.js";
import { Config } from "./config/config.js";
import { Gui } from "./ui/Gui.js";

const solarSystem = new SolarSystem(new Vector([0, 0]));
if(Config.SELECT_TEST > 0) await solarSystem.importExperiment("tests/test" + Config.SELECT_TEST)
else await solarSystem.importExperiment(Config.EXPERIMENTS[Config.SELECT]);

const canvas = new Canvas(new Updater(solarSystem), new Gui(solarSystem));
canvas.render(solarSystem);
canvas.toFollow(solarSystem.selectBody("Star-0")!)