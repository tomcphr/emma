export default class Drop extends Phaser.GameObjects.Sprite {
    constructor(scene, item, quantity, x, y) {
        super(scene, x, y, "items", item);
        scene.physics.world.enable(this);
        scene.add.existing(this);

        this.scene = scene;
        this.item = item;
        this.quantity = quantity;

        this.setScale(0.5);

        this.body.setImmovable(1);

        this.texture.setFilter(Phaser.Textures.FilterMode.NEAREST);
    };

    getItemId() {
        return this.item;
    };

    getQuantity() {
        return this.quantity;
    };
}
