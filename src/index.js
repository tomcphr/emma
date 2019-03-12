import World from "./scenes/World";

window.onload = new Phaser.Game({
    type: Phaser.AUTO,
    physics: {
        default: "arcade",
        arcade: {
            gravity: {y: 0},
            debug: false
        }
    },
    scale: {
        parent: "gameContainer",
        width: 960,
        height: 600,
        //mode: Phaser.Scale.FIT,
        //autoCenter: Phaser.Scale.CENTER_BOTH
    },
    pixelArt: true,
    scene: [World],
});
