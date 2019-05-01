import Player from "../objects/Player";
import World from "../objects/World";
import Wanderer from "../objects/Npcs/Wanderer";

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
        this.keys = this.input.keyboard.createCursorKeys();

        this.world = new World(this);
        this.world.generate();
        this.world.getFirstRoom().setAlpha(1);

        this.boundaries = this.world.getBoundariesLayer();
        this.boundaries.setCollisionByExclusion([2]);

        this.npcs = this.add.group();

        let spawnX = this.world.getFirstRoom().getSpawnX();
        let spawnY = this.world.getFirstRoom().getSpawnY();

        this.player = new Player(this, spawnX, spawnY);
        this.physics.add.collider(this.player, this.npcs, (player, npc) => {
            this.input.keyboard.off("keydown-SPACE");
            this.input.keyboard.on("keydown-SPACE", () => {
                npc.interact();
            });
        });

        this.wanderer = new Wanderer(this, spawnX + 32, spawnY + 32);

        const camera = this.cameras.main;
        camera.startFollow(this.player);
        camera.setBounds(0, 0, this.world.getTileMap().widthInPixels, this.world.getTileMap().heightInPixels);
    };

    update() {
        this.player.update();

        this.world.update();
    };
}
