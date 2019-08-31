import Dialog from "../objects/Dialog";
import Inventory from "../objects/Inventory";
export default class Ui extends Phaser.Scene
{
    constructor() {
        super({key: "Ui", active: false});
        this.depth = 0;
    };

    create() {
        let depthText = this.add.text(25, 25, "Depth: " + this.depth, {fontSize: "16px", fill: "#FFF"});
        depthText.setScrollFactor(0);

        //  Grab a reference to the Game Scene
        let game = this.scene.get("Game");

        //  Listen for events from it
        game.events.on("downWeGo", () => {
            this.depth++;
            depthText.setText("Depth: " + this.depth);
        }, this);

        this.dialog = new Dialog(this);

        this.inventory = new Inventory(this);

        this.toolbar = this.add.group();

        let inventoryButton = this.add.sprite(760, 560, "buttons", 0)
            .setInteractive({useHandCursor: true})
            .setScrollFactor(0);
        inventoryButton.on("pointerover", () => {
            let y = 510;

            let items = this.inventory.getItems();

            for (var id in items) {
                let item = items[id];

                let elementFrame = this.add.image(760, y, "element-frame");
                let elementItem = this.add.sprite(760, y, "items", item.getId());
                elementItem.setScale(0.9);

                this.toolbar.add(elementFrame);
                this.toolbar.add(elementItem);

                y-=50;
            }
        }, this);
        inventoryButton.on("pointerout", () => {
            this.toolbar.clear(true, true);
        });
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
