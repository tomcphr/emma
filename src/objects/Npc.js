import Character from "./Character";
export default class Npc extends Character {
    constructor(scene, x, y, id) {
        super(scene, "characters", x, y);

        this.id = id;

        scene.world.npcs.add(this);
    };

    interact() {
    };

    update() {
    };
}
