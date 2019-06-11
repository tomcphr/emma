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

        var dialogRectOuter = this.add.rectangle(25, 450, 250, 125, "0x808080");
        dialogRectOuter.setOrigin(0, 0);
        dialogRectOuter.setScrollFactor(0);

        var dialogRectInner = this.add.rectangle(30, 455, 240, 115, "0xffffff");
        dialogRectInner.setOrigin(0, 0);
        dialogRectInner.setScrollFactor(0);

        var dialogRectInnerOuter = this.add.rectangle(30, 555, 240, 15, "0x808080");
        dialogRectInnerOuter.setOrigin(0, 0);
        dialogRectInnerOuter.setScrollFactor(0);

        gameScene.events.on("dialogText", function (text) {
            let y = 460;
            for (var i = 0; i < text.length; i++) {
                let dialogText = this.add.text(35, y, text[i], {fontSize: "16px", fill: "#000"});
                dialogText.setScrollFactor(0);
                dialogText.setText(text[i]);
                y = y + 20;
            }
        }, this);
    };
}
