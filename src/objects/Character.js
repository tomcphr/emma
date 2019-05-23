export default class Character extends Phaser.GameObjects.Sprite {
    constructor(scene, spritesheet, x, y) {
        super(scene, x, y, spritesheet, 0);
        scene.physics.world.enable(this);
        scene.add.existing(this);

        scene.physics.add.collider(this, scene.boundaries);

        this.speed = 150;

        this.setScale(0.5);
    };

    getSpeed() {
        return this.speed;
    };

    freeze() {
        this.body.moves = false;
    };
}
