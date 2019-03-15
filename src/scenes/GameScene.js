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
    };

    create() {
        this.world = new World(this);
        this.world.generate();
        this.world.getFirstRoom().setAlpha(1);

        this.playerObject = new Player(this, this.world);
        this.player = this.playerObject.draw();

        this.cameras.main.startFollow(this.player);
    };

    update(time) {
    };
}
