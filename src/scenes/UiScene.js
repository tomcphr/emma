import Dialog from "../objects/Dialog";
export default class UiScene extends Phaser.Scene
{
    constructor() {
        super({key: "UiScene", active: true});

        this.depth = 0;
    };

    preload() {
        this.load.spritesheet("buttons", "../../assets/tilesets/buttons.png", {
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

        this.invButton = this.add.sprite(760, 560, "buttons", 0)
            .setInteractive()
            .setScrollFactor(0);
        this.invButton.on("pointerup", () => {
            alert("OOOOO");
        })
    };

    getDialog() {
        return this.dialog;
    };
}
