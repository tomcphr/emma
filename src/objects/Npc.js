import Character from "./Character";
export default class Npc extends Character {
    constructor(scene, x, y, id) {
        super(scene, "characters", x, y);
        scene.world.npcs.add(this);

        this.id = id;
        this.scene = scene;
    };

    interact() {
    };

    update() {
    };

    getDistance() {
        let distance = Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, this.x, this.y);
        return distance.toFixed(2);
    };
}
