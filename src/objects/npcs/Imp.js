import Npc from "../Npc";
export default class Imp extends Npc {
    constructor(scene, x, y) {
        super(scene, x, y, "imp");

        this.scene = scene;

        scene.anims.create({
            key: "imp-horizontal",
            frames: scene.anims.generateFrameNumbers("imp", { start: 8, end: 15 }),
            frameRate: 12,
            repeat: -1
        });
        this.anims.load("imp-horizontal");

        this.body.setSize(15, 15);
        this.body.setOffset(7, 16);
    };

    interact () {
        // do some attacking code here
    };

    update () {
        if (this.body) {
            // If the player is nearby then move towards them.
            let distance = this.getDistance();
            if (distance < 100 && distance > 30) {
                this.move();
            } else {
                // Otherwise; we want to patrol.
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
