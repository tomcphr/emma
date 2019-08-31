import Player from "../objects/Player";
import World from "../objects/World";
import Wanderer from "../objects/npcs/Wanderer";
import Loot from "../objects/Loot";
import Item from "../objects/Item";
import Loader from "../objects/Loader";
export default class Game extends Phaser.Scene
{
    constructor() {
        super({key: "Game", active: true});
    };

    preload() {
        let loader = new Loader(this);
        loader.load([
            {key: "dungeon", folder: "tilesets", filename: "dungeon.png"},
            {key: "element-frame", folder: "tilesets", filename: "element-frame.png"},
            {key: "characters", folder: "spritesheets", filename: "characters.png", frameSize: 64},
            {key: "imp", folder: "spritesheets", filename: "imp.png", frameSize: 32},
            {key: "items", folder: "spritesheets", filename: "items.png", frameSize: 32},
            {key: "buttons", folder: "tilesets", filename: "buttons.png", frameSize: 40},
        ]);
    }

    create() {
        // Launch the UI scene
        this.scene.launch("Ui");

        this.keys = this.input.keyboard.addKeys("W,S,A,D,up,down,left,right,space");

        this.world = new World(this);
        this.world.generate();

        let firstRoom = this.world.getFirstRoom();
        firstRoom.setAlpha(1);
        let spawnX = firstRoom.getSpawnX() + 16;
        let spawnY = firstRoom.getSpawnY() + 16;

        this.wanderer = new Wanderer(this, spawnX, spawnY);

        this.player = new Player(this, spawnX, spawnY + 32);

        let camera = this.cameras.main;
        camera.startFollow(this.player);
        camera.setBounds(0, 0, this.world.getTileMap().widthInPixels, this.world.getTileMap().heightInPixels);
        camera.setZoom(2);

        // Keyboard events
        let events = {
            "keydown-SPACE" : () => {
                this.world.npcs.getChildren().forEach((npc) => {
                    if (npc.getDistance() <= (npc.height / 2) || npc.getDistance() <= (npc.width / 2)) {
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

    getDialog() {
        return this.scene.get("Ui").getDialog();
    };

    getInventory() {
        return this.scene.get("Ui").getInventory();
    };

    getDepth() {
        return this.scene.get("Ui").getDepth();
    };
}
