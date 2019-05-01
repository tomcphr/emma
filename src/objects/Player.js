import Character from "./Character";

export default class Player extends Character {
    constructor(scene, x, y) {
        super(scene, "characters", x, y, "player");

        this.keys = scene.keys;
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

        // Horizontal movement
        if (this.keys.left.isDown) {
            this.body.setVelocityX(-speed);
            this.setFlipX(true);
        } else if (this.keys.right.isDown) {
            this.body.setVelocityX(speed);
            this.setFlipX(false);
        }

        // Vertical movement
        if (this.keys.up.isDown) {
            this.body.setVelocityY(-speed);
        } else if (this.keys.down.isDown) {
            this.body.setVelocityY(speed);
        }

        // Normalize and scale the velocity so that sprite can't move faster along a diagonal
        this.body.velocity.normalize().scale(speed);
    };
}
