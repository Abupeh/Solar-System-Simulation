import { Button } from "../elements/Button.js";
export class SystemButton {
    static Length = 5;
    static YGap = 6;
    static Height = 5;
    static createBodyList(solarSystem) {
        if (solarSystem())
            return solarSystem().bodies.map((body, i) => {
                return new Button(1, SystemButton.YGap * i + 1, SystemButton.Length, SystemButton.Height, body.name);
            });
        return [];
    }
}
