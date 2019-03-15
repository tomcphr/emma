export default class Player {
    constructor(scene, x, y) {
        this.scene = scene;

        this.sprite = scene.physics.add
            .sprite(x, y, "characters", 0)
            .setSize(22, 33)
            .setOffset(23, 27);

        this.keys = scene.input.keyboard.createCursorKeys();
    };

    freeze() {
        this.sprite.body.moves = false;
    };

    update() {
        const keys = this.keys;
        const sprite = this.sprite;
        const speed = 300;
        const prevVelocity = sprite.body.velocity.clone();

        // Stop any previous movement from the last frame
        sprite.body.setVelocity(0);

        // Horizontal movement
        if (keys.left.isDown) {
            sprite.body.setVelocityX(-speed);
            sprite.setFlipX(true);
        } else if (keys.right.isDown) {
            sprite.body.setVelocityX(speed);
            sprite.setFlipX(false);
        }

        // Vertical movement
        if (keys.up.isDown) {
            sprite.body.setVelocityY(-speed);
        } else if (keys.down.isDown) {
            sprite.body.setVelocityY(speed);
        }

        // Normalize and scale the velocity so that sprite can't move faster along a diagonal
        sprite.body.velocity.normalize().scale(speed);
    };

    destroy() {
        this.sprite.destroy();
    };
}
