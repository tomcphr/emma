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
        var quests = this.getQuests();

        let text = [
            "Traveller,",
            "I have these quests:",
        ];
        for (var id in quests) {
            var quest = quests[id];

            text.push("- " + quest.getTitle());
        }

        this.scene.events.emit("dialogText", text);
    };
}
