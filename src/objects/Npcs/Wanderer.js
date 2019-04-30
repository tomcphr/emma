import Character from "../Character";

export default class Wanderer extends Character {
    constructor(scene, x, y, id) {
        super(scene, "characters", x, y, "wanderer");
    };
}
