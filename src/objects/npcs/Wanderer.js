import Npc from "../Npc";
import Speech from "../Speech";
export default class Wanderer extends Npc {
    constructor(scene, x, y) {
        super(scene, x, y, "wanderer");

        this.scene = scene;

        this.setScale(0.5);
        this.body.setSize(30, 30);
        this.body.setOffset(18, 11);

        this.speech = new Speech(scene, [
            [
                "Traveller,",
                "Welcome the Vizore",
                "Go forth and prosper!",
            ],
            [
                "Or die, I mean whatever",
                "It's your choice",
                "Why are you still here?"
            ],
        ]);
    };

    interact() {
        let speech = this.speech.getText();

        this.scene.getDialog().destroy();
        if (speech) {
            this.scene.getDialog().show(speech);
        }
    };

    update() {
        let outOfRange = this.getDistance() > (this.height / 2);
        if (outOfRange) {
            this.speech.reset();
            this.scene.getDialog().destroy();
        }
    };
}
