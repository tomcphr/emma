import Player from "../objects/Player";
import World from "../objects/World";

export default class GameScene extends Phaser.Scene
{
    constructor() {
        super();
    };

    preload() {
        let assets = "../../assets";
        this.load.image("dungeon", assets + "/tilesets/dungeon.png");
        this.load.spritesheet("characters", assets + "/spritesheets/characters.png", {
            frameWidth: 64,
            frameHeight: 64
        });
    };

    create() {
        this.world = new World(this);
        this.world.generate();
        this.world.getFirstRoom().setAlpha(1);

        let spawnX = this.world.getFirstRoom().getSpawnX();
        let spawnY = this.world.getFirstRoom().getSpawnY();
        this.player = new Player(this, spawnX, spawnY);

        let boundaries = this.world.getBoundariesLayer();
        boundaries.setCollisionByExclusion([1]);
        this.physics.add.collider(this.player.sprite, boundaries);

        const camera = this.cameras.main;
        camera.startFollow(this.player.sprite);
        camera.setBounds(0, 0, this.world.getTileMap().widthInPixels, this.world.getTileMap().heightInPixels);
    };

    update() {
        this.player.update();

        this.world.update(this.player);
    };
}
