import Npc from "../Npc";
export default class Wanderer extends Npc {
    constructor(scene, x, y) {
        super(scene, "characters", x, y, "wanderer");
    };
}
