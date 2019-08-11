import Character from "./Character";
import Loot from "./Loot";
export default class Npc extends Character {
    constructor(scene, x, y, id, dropTable) {
        super(scene, "characters", x, y);
        scene.world.npcs.add(this);

        this.id = id;
        this.scene = scene;

        this.speed = 200;

        this.dropTable = dropTable;

        this.freeze();
    };

    interact() {
    };

    update() {
    };

    getDistance() {
        let distance = Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, this.x, this.y);
        return distance.toFixed(2);
    };

    freeze() {
        this.walking = false;
        super.freeze();
    };

    destroy() {
        // If we are still in the scene, then do any final logic for this npc.
        if (this.scene) {
            if (this.dropTable) {
                let loot = new Loot(this.scene, this.dropTable);
                let drops = loot.getItems(5);
                for (var drop in drops) {
                    let item = drops[drop];

                    this.scene.world.addDrop(item, this.x, this.y);
                };
            }
        }
        super.destroy();
    };
}
