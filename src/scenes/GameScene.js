import Player from "../objects/Player";
import World from "../objects/World";
import Wanderer from "../objects/npcs/Wanderer";

export default class GameScene extends Phaser.Scene
{
    constructor() {
        super({key: "GameScene", active: true});
    };

    preload() {
        let assets = "../../assets";
        this.load.image("dungeon", assets + "/tilesets/dungeon.png");
        this.load.spritesheet("characters", assets + "/spritesheets/characters.png", {
            frameWidth: 64,
            frameHeight: 64
        });
        this.load.spritesheet("imp", assets + "/spritesheets/imp.png", {
            frameWidth: 32,
            frameHeight: 32
        });
    };

    create() {
        this.keys = this.input.keyboard.createCursorKeys();

        this.world = new World(this);
        this.world.generate();
        this.world.getFirstRoom().setAlpha(1);

        let spawnX = this.world.getFirstRoom().getSpawnX();
        let spawnY = this.world.getFirstRoom().getSpawnY();

        this.wanderer = new Wanderer(this, spawnX, spawnY);

        this.player = new Player(this, spawnX, spawnY + 32);

        const camera = this.cameras.main;
        camera.startFollow(this.player);
        camera.setBounds(0, 0, this.world.getTileMap().widthInPixels, this.world.getTileMap().heightInPixels);
        camera.setZoom(2);

        // Keyboard events
        let events = {
            "keydown-SPACE" : () => {
                this.world.npcs.getChildren().forEach((npc) => {
                    npc.interact();
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

    getDialog() {
        return this.scene.get("UiScene").getDialog();
    };

    getDepth() {
        return this.scene.get("UiScene").depth;
    };
}
