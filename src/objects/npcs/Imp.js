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

        this.body.setSize(16, 16);

        this.graphics = scene.add.graphics();
    };

    update () {
        if (this.body) {
            // If the player is nearby then move towards them.
            let distance = this.getDistance();
            if (distance < 125 && distance > 10) {
                if (!this.walking) {
                    this.path = this.scene.world.findPath(this, this.scene.player);
                }
                this.move();
            } else {
                this.walking = false;
            }

            if (!this.walking) {
                this.freeze();
            }
        }
    };

    move () {
        if (!this.body) {
            return;
        }
        let speed = 1;
        this.walking = false;
        if (this.path.length) {
            this.body.moves = true;
            this.anims.play("imp-horizontal", true);

            let target = this.path[0];

            let targetX = target.x + 16;
            let targetY = target.y + 16;

            if (targetY < this.y) {
                // up
                if ((this.y - speed) < targetY) {
                    this.y = targetY;
                } else {
                    this.y += -speed;
                }
            } else if (targetY > this.y) {
                // down
                if ((this.y + speed) > targetY) {
                    this.y = targetY;
                } else {
                    this.y += speed;
                }
            } else if (targetX > this.x) {
                // right
                if ((this.x + speed) > targetX) {
                    this.x = targetX;
                } else {
                    this.x += speed;
                }
            } else if (targetX < this.x) {
                // left
                if ((this.x - speed) < targetX) {
                    this.x = targetX;
                } else {
                    this.x += -speed;
                }
            }
            let areWeThereYet = (this.x == targetX && this.y == targetY);
            if (!areWeThereYet) {
                this.walking = true;
            }
        } 

        this.setFlipX(false);
        // If we are to the right of the player then flip
        if (this.x > this.scene.player.x) {
            this.setFlipX(true);
        }
    }
}
