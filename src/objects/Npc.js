import Character from "./Character";
export default class Npc extends Character {
    constructor(scene, x, y, id) {
        super(scene, "characters", x, y);

        this.body.setImmovable(1);

        scene.npcs.add(this);

        this.id = id;
    };

    interact() {
        switch (this.id) {
            case "wanderer":
                alert("Bit quiet.. eh?");
                break;
        }
    };
}
