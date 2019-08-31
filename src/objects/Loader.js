const path = require("path");
export default class Loader
{
    constructor(scene)
    {
        this.scene = scene;
        this.bar = scene.add.graphics();
        this.box = scene.add.graphics();
    }

    load(assets)
    {
        this.box.fillStyle(0x222222, 0.8);
        this.box.fillRect(240, 270, 320, 50);
        for (var i = 0; i < assets.length; i++) {
            let asset = assets[i];

            let path = this.getPath(asset.folder, asset.filename);

            let frameSize = asset.frameSize;
            if (frameSize) {
                this.scene.load.spritesheet(asset.key, path, {
                    frameWidth: frameSize,
                    frameHeight: frameSize
                });
                continue;
            }

            this.scene.load.image(asset.key, path);
        };

        this.scene.load.on("progress", (value) => {
            this.bar.clear();
            this.bar.fillStyle(0xffffff, 1);
            this.bar.fillRect(250, 280, 300 * value, 30);
        });
        this.scene.load.on("fileprogress", this.loading);
        this.scene.load.on("complete", () => {
            this.bar.destroy();
            this.box.destroy();
        });
    }

    loading(file)
    {
        console.log("loading: " + file.src);
    };

    getPath(directory, filename)
    {
        return "." + path.resolve("assets", directory, filename);
    }
}
