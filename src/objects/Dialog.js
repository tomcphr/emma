export default class Dialog
{
    constructor(scene) {
        this.scene = scene;

        this.text = null;
    }

    show(text) {
        this.destroy();

        let dialogText = this.scene.add.text(25, 490, text, {
            fontFamily: "Courier",
            backgroundColor: "#FFF",
            fontSize: "16px",
            fill: "#000",
            wordWrap: {
                width: 400
            },
            padding: {
                left: 15,
                right: 15,
                top: 15,
                bottom: 15
            },
            fixedWidth: 400,
            maxLines: 5,
            lineSpacing: 2
        });
        dialogText.setScrollFactor(0);
        this.text = dialogText;
    }

    destroy() {
        if (this.text) {
            this.text.destroy();
        }
    }
}
