export default class Character extends Phaser.GameObjects.Sprite {
    constructor(scene, spritesheet, x, y, character) {
        super(scene, x, y, spritesheet, 0);
        scene.physics.world.enable(this);
        scene.add.existing(this);

        this.body.setSize(22, 33);
        this.body.setOffset(23, 27);

        scene.physics.add.collider(this, scene.boundaries);

        this.speed = 300;

        this.character = character;

        // Npcs cannot move, but the player can
        if (character === "player") {
            this.body.setImmovable(0);
        } else {
            this.body.setImmovable(1);

            // If we are an NPC then we want to add us to the Npc group.
            this.scene.npcs.add(this);
        }
    };

    getSpeed() {
        return this.speed;
    };

    freeze() {
        this.body.moves = false;
    };

    interact() {
        switch (this.character) {
            case "wanderer":
                alert("Bit quiet.. eh?");
                break;
        }
    };
}
