import Npc from "../Npc";
import CooksAssistant from "./quests/CooksAssistant";
export default class Wanderer extends Npc {
    constructor(scene, x, y) {
        super(scene, "characters", x, y, "wanderer");

        this.scene = scene;

        this.quests = [
            new CooksAssistant(this.scene),
        ];
    };

    quests() {
        return this.quests;
    };
}
