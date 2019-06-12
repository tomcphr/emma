import Dialog from "../objects/Dialog";
export default class UiScene extends Phaser.Scene
{
    constructor() {
        super({key: "UiScene", active: true});

        this.depth = 0;
    };

    preload() {
    };

    create() {
        let depthText = this.add.text(16, 16, "Depth: " + this.depth, {fontSize: "16px", fill: "#FFF"});
        depthText.setScrollFactor(0);

        //  Grab a reference to the Game Scene
        let gameScene = this.scene.get("GameScene");

        //  Listen for events from it
        gameScene.events.on("downWeGo", function () {
            this.depth++;
            depthText.setText("Depth: " + this.depth);
        }, this);

        this.dialog = new Dialog(this);
    };

    getDialog() {
        return this.dialog;
    };
}
