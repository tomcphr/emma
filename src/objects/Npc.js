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

        this.currentTarget = null;

        this.freeze();
    };

    goTo (targetPoint) {
        if (!this.scene) {
            return;
        }

        // Find a path to the target
        this.path = this.scene.world.navMesh.findPath(this.position, targetPoint);

        // If there is a valid path, grab the first point from the path and set it as the target
        if (this.path && this.path.length > 0) {
            this.currentTarget = this.path.shift(); 
        }   else {
            this.currentTarget = null;
        }
    }

    interact() {
    };

    update() {
        super.update();

        super.freeze();

        // If we currently have a valid target location
        if (this.currentTarget) {
            // Move towards the target


            // Check if we have reached the current target (within a fudge factor)
            var d = Phaser.Math.Distance.Between(this.position.x, this.position.y, this.currentTarget.x, this.currentTarget.y);
            console.log(this.position, this.currentTarget);
            if (d < 5) {
                // If there is path left, grab the next point. Otherwise, null the target.
                if (this.path && this.path.length > 0) {
                    this.currentTarget = this.path.shift(); 
                }   else {
                    this.currentTarget = null;
                }
            }
        }
    };

    getDistance() {
        let distance = Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, this.x, this.y);
        return distance.toFixed(2);
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
