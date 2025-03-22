import { Universe } from "./core/Universe.js";
import { Camera } from "./display/base/Camera.js";
import { Global } from "./global/Global.js";

const universe = new Universe("Solar-System", "-B1.1$consice");

await universe.import("test7", "tests");

const global = new Global(universe);
global.render();

setInterval(() => {
    console.log(universe.astroObjects[universe.astroObjects.length - 1]);
}, 10000)