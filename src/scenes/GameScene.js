import Player from "../objects/Player";
import World from "../objects/World";
import Wanderer from "../objects/npcs/Wanderer";

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
        this.anims.create({
            key: "horizontal",
            frames: this.anims.generateFrameNumbers("characters", { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.keys = this.input.keyboard.createCursorKeys();

        this.world = new World(this);
        this.world.generate();
        this.world.getFirstRoom().setAlpha(1);

        this.boundaries = this.world.getBoundariesLayer();
        this.boundaries.setCollisionByExclusion([2]);

        let spawnX = this.world.getFirstRoom().getSpawnX();
        let spawnY = this.world.getFirstRoom().getSpawnY();

        this.npcs = this.add.group();
        this.wanderer = new Wanderer(this, spawnX + 32, spawnY + 32);

        this.player = new Player(this, spawnX, spawnY);

        const camera = this.cameras.main;
        camera.startFollow(this.player);
        camera.setBounds(0, 0, this.world.getTileMap().widthInPixels, this.world.getTileMap().heightInPixels);

        // Collide the Npcs with the player.
        this.physics.add.collider(this.player, this.npcs);

        // Keyboard events
        let events = {
            "keydown-SPACE" : () => {
                this.npcs.getChildren().forEach((npc) => {
                    let distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, npc.x, npc.y).toFixed(2);
                    if (distance < 40) {
                        npc.interact();
                    }
                }, this);
            },
        };
        for (var type in events) {
            this.input.keyboard.on(type, events[type]);
        }
    };

    update() {
        this.player.update();

        this.world.update();
    };
}
