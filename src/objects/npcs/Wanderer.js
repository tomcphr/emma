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

        this.talking = false;
    };

    getQuests() {
        return this.quests;
    };

    interact() {
        if (this.getDistance() > 40) {
            return;
        }

        this.talking = true;

        var quests = this.getQuests();

        let questsText = [
            "Traveller,",
            "I have these quests:"
        ];
        for (var id in quests) {
            questsText.push("- " + quests[id].getTitle());
        }

        this.scene.getDialog().show([questsText]);
    };

    update() {
        if (this.getDistance() > (this.height / 2)) {
            if (this.talking) {
                this.scene.getDialog().destroy();
                this.talking = false;
            }
        }
    };
}
