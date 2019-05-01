export default class Character extends Phaser.GameObjects.Sprite {
    constructor(scene, spritesheet, x, y) {
        super(scene, x, y, spritesheet, 0);
        scene.physics.world.enable(this);
        scene.add.existing(this);

        this.body.setSize(22, 33);
        this.body.setOffset(23, 27);

        scene.physics.add.collider(this, scene.boundaries);

        this.speed = 300;
    };

    getSpeed() {
        return this.speed;
    };

    freeze() {
        this.body.moves = false;
    };
}
