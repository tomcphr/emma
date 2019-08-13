import Npc from "../Npc";
export default class Imp extends Npc {
    constructor(scene, x, y) {
        super(scene, x, y, "imp", [
            {id: 0, chance: 100, min: 15, max: 200},
            {id: 1, chance: 50, min: 1, max: 1},
            {id: 2, chance: 0.1, min: 1, max: 1},
        ]);

        this.scene = scene;

        scene.anims.create({
            key: "imp-horizontal",
            frames: scene.anims.generateFrameNumbers("imp", { start: 8, end: 15 }),
            frameRate: 12,
            repeat: -1
        });
        this.anims.load("imp-horizontal");

        this.body.setSize(16, 16);

        this.graphics = scene.add.graphics();
    };

    interact () {        
        this.destroy();
    };

    update () {
    };
}
