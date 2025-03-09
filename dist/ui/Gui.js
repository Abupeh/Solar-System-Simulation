import { Config } from "../config/config.js";
import { GuiConfig } from "../config/guiconfig.js";
import { BlackHole } from "../elements/BlackHole.js";
import { Moon } from "../elements/Moon.js";
import { Planet } from "../elements/Planet.js";
import { Star } from "../elements/Star.js";
import { PlaceConfig } from "./container/PlaceConfig.js";
import { Button } from "./elements/Button.js";
import { Container } from "./elements/Container.js";
export class Gui {
    solarSystem;
    canvas = document.getElementById("canvas");
    camera;
    updater;
    elements = [];
    constructor(solarSystem) {
        this.solarSystem = solarSystem;
        this.createButtons();
        this.createContainers();
        this.canvas.addEventListener("click", (event) => this.global.callback(event));
    }
    global = {
        clicks: 0,
        callback(mouse) { },
        destroy() {
            if (this.clicks <= 1)
                return;
            this.clicks = 0;
            this.callback = () => { };
        },
        onclick(callback) {
            this.clicks = 0;
            this.callback = (mouse) => {
                this.clicks++;
                this.destroy();
                callback(mouse);
            };
        },
        second() {
            return this.clicks === 0;
        },
    };
    follow = {
        body: -1,
        add: () => {
            this.follow.body++;
            if (this.follow.body >= this.solarSystem.bodies.length)
                this.follow.body = 0;
        },
        subtract: () => {
            this.follow.body--;
            if (this.follow.body < 0)
                this.follow.body = this.solarSystem.bodies.length - 1;
        },
        toggle: () => {
            if (this.follow.body == -1)
                return (this.follow.body = 0);
            this.follow.body = -1;
        },
    };
    placeConfigs = {
        BlackHole: new PlaceConfig(this, BlackHole.name, BlackHole.placeConfig, BlackHole.qualities, BlackHole.types),
        Star: new PlaceConfig(this, Star.name, Star.placeConfig, Star.qualities, Star.types),
        Planet: new PlaceConfig(this, Planet.name, Planet.placeConfig, Planet.qualities, Planet.types),
        Moon: new PlaceConfig(this, Moon.name, Moon.placeConfig, Moon.qualities, Moon.types),
    };
    selectedPlaceConfig = "Planet";
    createButtons() {
        //Add Celestial Body
        const AddBody = new Button(1, 1, 4, 4, "+").onclick(() => {
            this.canvas.style.cursor = "crosshair";
            this.global.onclick((mouse) => {
                if (!this.global.second())
                    return;
                const body = this.placeConfigs[this.selectedPlaceConfig].create(mouse);
                this.solarSystem.bodies.push(body);
            });
        });
        this.addElement(AddBody);
        const removeBody = new Button(11, 1, 4, 4, "x").onclick(() => {
            this.updater.holdpauses.forEach((body) => this.solarSystem.bodies.splice(this.solarSystem.bodies.indexOf(body), 1));
        });
        this.addElement(removeBody);
        const CameraNext = new Button(11, 6, 4, 4, ">").onclick(() => {
            this.follow.add();
            this.camera.followingBody = this.solarSystem.bodies[this.follow.body];
        });
        this.addElement(CameraNext);
        const CameraBack = new Button(1, 6, 4, 4, "<").onclick(() => {
            this.follow.subtract();
            this.camera.followingBody = this.solarSystem.bodies[this.follow.body];
        });
        this.addElement(CameraBack);
        const FollowToggle = new Button(6, 6, 4, 4, "o").onclick(() => {
            this.follow.toggle();
            this.camera.followingBody = this.solarSystem.bodies[this.follow.body];
        });
        this.addElement(FollowToggle);
    }
    selectedPlaceConfigCheck = [
        () => this.selectedPlaceConfig === "BlackHole",
        () => this.selectedPlaceConfig === "Star",
        () => this.selectedPlaceConfig === "Planet",
        () => this.selectedPlaceConfig === "Moon",
    ];
    CelestialBodySelector = new Container(0.5, 2, 18, 5, [
        new Button(13.5, 0, 4, 4, "B").onclick(() => {
            this.selectedPlaceConfig = "BlackHole";
        }),
        new Button(0, 0, 4, 4, "S").onclick(() => {
            this.selectedPlaceConfig = "Star";
        }),
        new Button(4.5, 0, 4, 4, "P")
            .onclick(() => {
            this.selectedPlaceConfig = "Planet";
        })
            .toggle(),
        new Button(9, 0, 4, 4, "M").onclick(() => {
            this.selectedPlaceConfig = "Moon";
        }),
    ])
        .includeFullToggle()
        .color(GuiConfig.FRONT_CONTAINER_COLOR);
    CelestialTypeSelector = new Container(0.5, 8, 18, 9, [
        this.placeConfigs.BlackHole.createTypes(),
        this.placeConfigs.Star.createTypes(),
        this.placeConfigs.Planet.createTypes(),
        this.placeConfigs.Moon.createTypes(),
    ])
        .singleEnable(this.selectedPlaceConfigCheck, this.CelestialBodySelector)
        .color(GuiConfig.FRONT_CONTAINER_COLOR);
    CelestialBodyCustomizer = new Container(0.5, 18, 18, 18, [
        this.placeConfigs.BlackHole.createVariables(),
        this.placeConfigs.Star.createVariables(),
        this.placeConfigs.Planet.createVariables(),
        this.placeConfigs.Moon.createVariables()
    ])
        .singleEnable(this.selectedPlaceConfigCheck, this.CelestialBodySelector)
        .color(GuiConfig.FRONT_CONTAINER_COLOR);
    createContainers() {
        const BodyCustomizer = new Container(80, 12.5, 20, 75, [
            this.CelestialBodySelector,
            this.CelestialTypeSelector,
            this.CelestialBodyCustomizer,
        ]);
        this.addElement(BodyCustomizer);
    }
    draw() {
        this.elements.forEach((element) => element.draw());
    }
    addElement(elem) {
        if (elem instanceof Container) {
            elem.configureElements();
            elem.elements.forEach((e) => this.addElement(e));
        }
        elem.x = Config.WIDTH * (elem.x / GuiConfig.SCALE);
        elem.y = Config.HEIGHT * (elem.y / GuiConfig.SCALE);
        elem.width = Config.WIDTH * (elem.width / GuiConfig.SCALE);
        elem.height = Config.HEIGHT * (elem.height / GuiConfig.SCALE);
        this.elements.push(elem);
    }
}
