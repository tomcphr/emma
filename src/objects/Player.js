import Character from "./Character";
export default class Player extends Character {
    constructor(scene, x, y) {
        super(scene, "characters", x, y, "player");

        this.body.setSize(30, 44);
        this.body.setOffset(18, 11);

        this.keys = scene.keys;

        this.body.setImmovable(0);

        this.anims.load("horizontal");
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

        let leftPressed = this.keys.left.isDown;
        let rightPressed = this.keys.right.isDown;
        let upPressed = this.keys.up.isDown;
        let downPressed = this.keys.down.isDown;

        // Horizontal movement
        if (leftPressed) {
            this.body.setVelocityX(-speed);
            this.setFlipX(true);
            this.anims.play("horizontal", true);
        } else if (rightPressed) {
            this.body.setVelocityX(speed);
            this.setFlipX(false);
            this.anims.play("horizontal", true);
        }

        // Vertical movement
        if (upPressed) {
            this.body.setVelocityY(-speed);
            this.anims.play("horizontal", true);
        } else if (downPressed) {
            this.body.setVelocityY(speed);
            this.anims.play("horizontal", true);
        }

        // If we are not pressing anything, then stop animations.
        if (!leftPressed && !rightPressed && !upPressed && !downPressed) {
            this.anims.pause(this.anims.currentAnim.frames[0]);
        }

        // Normalize and scale the velocity so that sprite can't move faster along a diagonal
        this.body.velocity.normalize().scale(speed);
    };
}
