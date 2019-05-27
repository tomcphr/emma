export default class Character extends Phaser.GameObjects.Sprite {
    constructor(scene, spritesheet, x, y) {
        super(scene, x, y, spritesheet, 0);
        scene.physics.world.enable(this);
        scene.add.existing(this);

        scene.physics.add.collider(this, scene.world.boundaries);
        scene.physics.add.collider(this, scene.world.npcs);

        this.body.setImmovable(1);

        this.speed = 150;
    };

    getSpeed() {
        return this.speed;
    };

    freeze() {
        // If we can access animations, pause the player.
        if (this.anims && this.anims.currentAnim) {
            let animation = this.anims.currentAnim;
            this.anims.pause(animation.frames[0]);
        }

        // If the character has a body, then stop it.
        if (this.body) {
            this.body.stop();
            this.body.moves = false;
        }
    };
}
