export default class Dialog
{
    constructor(scene)
    {
        this.scene = scene;

        this.text = null;
    }

    show(text, page = 0)
    {
        this.destroy();
        for (let i in this.dialog) {
            let sprite = this.dialog[i];
            sprite.setAlpha(1);
        }

        if ((page + 1) > text.length) {
            return;
        }

        let y = 460;
        let dialogText = this.scene.add.text(35, y, text[page], {
            backgroundColor: "#FFF",
            fontSize: "16px",
            fill: "#000",
            wordWrap: {
                width: 260
            },
            padding: {
                left: 5,
                right: 5,
                top: 10,
                bottom: 10
            },
            fixedWidth: 270,
            maxLines: 5,
            lineSpacing: 2
        });
        dialogText.setScrollFactor(0);
        this.text = dialogText;
    }

    destroy()
    {
        if (this.text) {
            this.text.destroy();
        }
    }
}
