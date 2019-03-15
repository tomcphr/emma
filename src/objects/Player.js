export default class Player
{
    constructor(scene, world) {
        this.scene = scene;
        this.world = world;

        this.width = world.getTileMap().tileWidth * world.getBoundariesLayer().scaleX;
        this.height = world.getTileMap().tileHeight * world.getBoundariesLayer().scaleY;

        this.graphics = scene.add.graphics({fillStyle: { color: 0xedca40, alpha: 1 }});
    };

    getWidth ()
    {
        return this.width;
    };

    getHeight ()
    {
        return this.height;
    };

    draw() {
        let graphics = this.graphics.fillRect(0, 0, this.width, this.height);
        graphics.x = this.world.getFirstRoom().getSpawnX();
        graphics.y = this.world.getFirstRoom().getSpawnY();
        return graphics;
    };
}
