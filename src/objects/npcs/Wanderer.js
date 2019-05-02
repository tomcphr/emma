import Npc from "../Npc";
import ChefsAssistant from "./quests/ChefsAssistant";
export default class Wanderer extends Npc {
    constructor(scene, x, y) {
        super(scene, "characters", x, y, "wanderer");

        this.scene = scene;

        this.quests = [
            new ChefsAssistant(this.scene),
        ];
    };

    quests() {
        return this.quests;
    };
}
