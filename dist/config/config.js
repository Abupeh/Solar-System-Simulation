export const Config = {
    //EXPERIMENTS
    EXPERIMENTS: ["data/solar_system.json", "data/threebodyproblem.json"],
    SELECT: 1,
    //COLORS
    BACKGROUND_COLOR: "#000000",
    //ANIMATION
    TIME_STEP: 150,
    TRAIL_LENGTH: 150,
    TRAIL_PUSH: 5,
    //CANVAS
    WIDTH: window.innerWidth,
    HEIGHT: window.innerHeight,
    SCROLL: 1.1,
    INITIAL_SCROLL: 0.01,
    //PHYSICS
    GRAVITATIONAL_CONSTANT: 1,
    FORCE_MAGNITUDE: 2000,
    STAR_SELFGRAVITY: 0.1,
    PLANET_SELFGRAVITY: 1,
    MOON_SELFGRAVITY: 1.2,
};
