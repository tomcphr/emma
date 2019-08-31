import Loader from "../objects/Loader";
export default class Preloader extends Phaser.Scene
{
    constructor() {
        super({key: "Preloader", active: true});
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
    };

    create() {
        this.scene.launch("Game");
        this.scene.launch("Ui");
        this.scene.stop();
    };
}
