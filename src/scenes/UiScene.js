import Dialog from "../objects/Dialog";
import Inventory from "../objects/Inventory";
import Loader from "../objects/Loader";
export default class UiScene extends Phaser.Scene
{
    constructor() {
        super({key: "UiScene", active: true});
        this.depth = 0;
    };

    preload() {
        this.load.spritesheet("buttons", (new Loader).getPath("tilesets", "buttons.png"), {
            frameWidth: 40,
            frameHeight: 40
        });
    };

    create() {
        let depthText = this.add.text(25, 25, "Depth: " + this.depth, {fontSize: "16px", fill: "#FFF"});
        depthText.setScrollFactor(0);

        //  Grab a reference to the Game Scene
        let gameScene = this.scene.get("GameScene");

        //  Listen for events from it
        gameScene.events.on("downWeGo", () => {
            this.depth++;
            depthText.setText("Depth: " + this.depth);
        }, this);

        this.dialog = new Dialog(this);

        this.inventory = new Inventory(this);

        let inventoryButton = this.add.sprite(760, 560, "buttons", 0)
            .setInteractive({useHandCursor: true})
            .setScrollFactor(0);
        inventoryButton.on("pointerup", () => {
            let items = this.inventory.getItems();
            console.table(items);
        }, this);
    };

    getDepth() {
        return this.depth;
    };

    getDialog() {
        return this.dialog;
    };

    getInventory() {
        return this.inventory;
    };
}
