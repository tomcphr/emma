export default class Drop extends Phaser.GameObjects.Sprite {
    constructor(scene, item, x, y) {
        super(scene, x, y, "items", item.getId());
        scene.physics.world.enable(this);
        scene.add.existing(this);

        this.scene = scene;
        this.item = item;

        this.setScale(0.5);

        this.body.setImmovable(1);

        this.texture.setFilter(Phaser.Textures.FilterMode.NEAREST);
    };

    getItemId() {
        return this.item.getId();
    };

    getQuantity() {
        return this.item.getQuantity();
    };
}
