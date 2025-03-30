import { Universe } from "./core/Universe.js";
import { Global } from "./global/Global.js";
const universe = new Universe("Solar-System");
await universe.import("modern_universe", "data");
const global = new Global(universe);
global.render();
setInterval(() => {
    console.log(universe.astroObjects[universe.astroObjects.length - 1]);
}, 10000);
