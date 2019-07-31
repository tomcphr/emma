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

        this.setText();
    };

    getQuests() {
        return this.quests;
    };

    setText() {
        var quests = this.getQuests();
        let questsText = [
            "Traveller,",
            "I have these quests:"
        ];
        for (var id in quests) {
            questsText.push("- " + quests[id].getTitle());
        }
        this.text = [
            questsText,
            [
                "I have nothing left to say",
                "Why are you still here?"
            ],
        ];
    };

    interact() {
        if (this.getDistance() > (this.height / 2)) {
            this.setText();
            return;
        }

        // If we have ran out of text, then destroy the dialog but reset the text.
        if (!this.text.length) {
            this.scene.getDialog().destroy();
            this.setText();
            return;
        }

        this.talking = true;

        this.scene.getDialog().show(this.text[0]);

        this.text.shift();
    };

    update() {
        let outOfRange = this.getDistance() > (this.height / 2);
        if (outOfRange) {
            if (this.talking) {
                this.scene.getDialog().destroy();
                this.setText();
                this.talking = false;
            }
        }
    };
}
