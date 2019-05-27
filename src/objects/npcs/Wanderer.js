import Npc from "../Npc";
import ChefsAssistant from "./quests/ChefsAssistant";
export default class Wanderer extends Npc {
    constructor(scene, x, y) {
        super(scene, x, y, "wanderer");

        this.scene = scene;

        this.quests = [
            new ChefsAssistant(this.scene),
        ];

        this.setScale(0.5);
        this.body.setSize(30, 30);
        this.body.setOffset(18, 11);
    };

    getQuests() {
        return this.quests;
    };

    interact () {
        console.log("I have these quests:");

        var quests = this.getQuests();

        for (var id in quests) {
            var quest = quests[id];
            console.log(id, " | ", quest.getTitle(), " | ", quest.getDescription(), " | ", quest.getStatus());
        }
    };
}
