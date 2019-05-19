import Character from "./Character";
export default class Npc extends Character {
    constructor(scene, x, y, id) {
        super(scene, "characters", x, y);

        this.body.setSize(30, 30);
        this.body.setOffset(18, 11);

        this.body.setImmovable(1);

        this.id = id;

        scene.npcs.add(this);
    };

    interact() {
        alert("Nothing much to say");
    };
}
