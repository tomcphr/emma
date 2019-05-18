import Character from "./Character";
export default class Npc extends Character {
    constructor(scene, x, y, id) {
        super(scene, "characters", x, y);

        this.body.setSize(24, 30);
        this.body.setOffset(22, 26);

        this.body.setImmovable(1);

        this.id = id;

        scene.npcs.add(this);
    };

    interact() {
        alert("Nothing much to say");
    };
}
