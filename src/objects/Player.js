import Character from "./Character";
export default class Player extends Character {
    constructor(scene, x, y) {
        super(scene, "characters", x, y, "player");

        this.body.setImmovable(0);
        this.body.setSize(30, 44);
        this.body.setOffset(18, 11);

        this.keys = scene.keys;

        scene.anims.create({
            key: "player-horizontal",
            frames: scene.anims.generateFrameNumbers("characters", { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.load("player-horizontal");

        this.setScale(0.5);

        scene.physics.add.collider(this, scene.world.drops, (player, drop) => {
            console.info("Picked up " + drop.getQuantity() + " of item (" + drop.getItemId() + ")");
            scene.getInventory().addItem(drop);
            drop.destroy();
        });
    };

    update() {
        // If we have a body, allow movement
        if (this.body) {
            this.move()
        }
    };

    move() {
        let speed = this.getSpeed();

        // Stop any previous movement from the last frame
        this.body.setVelocity(0);

        let leftPressed = this.keys.left.isDown || this.keys.A.isDown;
        let rightPressed = this.keys.right.isDown || this.keys.D.isDown;
        let upPressed = this.keys.up.isDown || this.keys.W.isDown;
        let downPressed = this.keys.down.isDown || this.keys.S.isDown;

        // Horizontal movement
        if (leftPressed) {
            this.body.setVelocityX(-speed);
            this.setFlipX(true);
        } else if (rightPressed) {
            this.body.setVelocityX(speed);
            this.setFlipX(false);
        }

        // Vertical movement
        if (upPressed) {
            this.body.setVelocityY(-speed);
        } else if (downPressed) {
            this.body.setVelocityY(speed);
        }

        // If we are not pressing anything, then stop animations.
        if (!leftPressed && !rightPressed && !upPressed && !downPressed) {
            this.anims.pause(this.anims.currentAnim.frames[0]);
        } else {
            this.anims.play("player-horizontal", true);
        }

        // Normalize and scale the velocity so that sprite can't move faster along a diagonal
        this.body.velocity.normalize().scale(speed);
    };
}
