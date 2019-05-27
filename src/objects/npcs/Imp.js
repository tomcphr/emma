import Npc from "../Npc";
export default class Imp extends Npc {
    constructor(scene, x, y) {
        super(scene, x, y, "imp");

        this.scene = scene;

        this.anims.load("imp-horizontal");

        this.body.setSize(15, 15);
        this.body.setOffset(7, 16);
    };

    interact () {
        // do some attacking code here
    };

    update () {
        if (this.body) {
            let distance = Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, this.x, this.y).toFixed(2);
            if (distance < 100 && distance > 28) {
                this.move();
            } else {
                this.freeze();
            }
        }
    };

    move () {
        if (!this.body) {
            return;
        }

        this.body.moves = true;
        this.anims.play("imp-horizontal", true);
        this.scene.physics.moveToObject(this, this.scene.player);

        this.setFlipX(false);
        // If we are to the right of the player then flip
        if (this.x > this.scene.player.x) {
            this.setFlipX(true);
        }
    }
}
