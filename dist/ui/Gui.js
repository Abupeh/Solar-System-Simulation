import { Config } from "../config/config.js";
import { GuiConfig } from "../config/guiconfig.js";
import { Moon } from "../elements/Moon.js";
import { Planet } from "../elements/Planet.js";
import { Star } from "../elements/Star.js";
import { Button } from "./elements/Button.js";
export class Gui {
    solarSystem;
    canvas = document.getElementById("canvas");
    camera;
    elements = [];
    constructor(solarSystem) {
        this.solarSystem = solarSystem;
        this.createButtons();
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
    place = {
        Planet: (mouse) => {
            return new Planet({
                name: "Planet-" + this.solarSystem.bodies.length,
                mass: 1500,
                radius: 1000,
                color: " #92ff9c",
                position: this.camera.getRelativeMouse(mouse),
                velocity: [0, 0],
            });
        },
        Moon: (mouse) => {
            const moon = new Moon({
                name: "Moon-" + this.solarSystem.bodies.length,
                mass: 500,
                radius: 300,
                color: " #c9c9c9",
                position: this.camera.getRelativeMouse(mouse),
                velocity: [0, 0],
            });
            console.log(moon);
            return moon;
        },
        Star: (mouse) => {
            return new Star({
                name: "Star-" + this.solarSystem.bodies.length,
                mass: 15000,
                radius: 10000,
                color: " #FFFAA0",
                position: this.camera.getRelativeMouse(mouse),
                velocity: [0, 0],
            });
        },
    };
    placeType = "Planet";
    createButtons() {
        //Add Celestial Body
        const AddBody = new Button(1, 1, 4, 4, "+").onclick(() => {
            this.canvas.style.cursor = "crosshair";
            this.global.onclick((mouse) => {
                if (!this.global.second())
                    return;
                this.solarSystem.bodies.push(this.place[this.placeType](mouse));
            });
        });
        this.addElement(AddBody);
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
        const ToStar = new Button(1, 11, 4, 4, "S").onclick(() => {
            this.placeType = "Star";
        });
        this.addElement(ToStar);
        const ToPlanet = new Button(6, 11, 4, 4, "P").onclick(() => {
            this.placeType = "Planet";
        });
        this.addElement(ToPlanet);
        const ToMoon = new Button(11, 11, 4, 4, "M").onclick(() => {
            this.placeType = "Moon";
        });
        this.addElement(ToMoon);
    }
    draw() {
        this.elements.forEach((element) => element.draw());
    }
    addElement(elem) {
        console.log(Config.WIDTH, elem.x, GuiConfig.SCALE);
        elem.x = Config.WIDTH * (elem.x / GuiConfig.SCALE);
        elem.y = Config.HEIGHT * (elem.y / GuiConfig.SCALE);
        elem.width = Config.WIDTH * (elem.width / GuiConfig.SCALE);
        elem.height = Config.HEIGHT * (elem.height / GuiConfig.SCALE);
        this.elements.push(elem);
    }
}
