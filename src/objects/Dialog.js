export default class Dialog
{
    constructor(scene)
    {
        this.scene = scene;

        this.dialog = [
            this.scene.add.rectangle(25, 450, 250, 125, "0x808080"),
            this.scene.add.rectangle(30, 455, 240, 115, "0xffffff"),
            this.scene.add.rectangle(30, 555, 240, 15, "0x808080")
        ];
        for (let i in this.dialog) {
            let sprite = this.dialog[i];
            sprite.setOrigin(0, 0);
            sprite.setScrollFactor(0);
            sprite.setAlpha(0);
        }

        this.text = [];
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
        for (var i = 0; i < text[page].length; i++) {
            let dialogText = this.scene.add.text(35, y, text[page][i], {fontSize: "16px", fill: "#000"});
            dialogText.setScrollFactor(0);
            dialogText.setText(text[i]);
            this.text.push(dialogText);
            y = y + 35;
        }
    }

    destroy()
    {
        for (let i in this.dialog) {
            let sprite = this.dialog[i];
            sprite.setAlpha(0);
        }

        for (let i in this.text) {
            let text = this.text[i];
            text.destroy();
        }
    }
}
