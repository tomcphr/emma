import GameScene from "./scenes/GameScene";
import UiScene from "./scenes/UiScene";
window.onload = new Phaser.Game({
    type: Phaser.AUTO,
    backgroundColor: "#000",
    physics: {
        default: "arcade",
        arcade: {
            gravity: {y: 0},
            debug: true
        }
    },
    scale: {
        parent: "gameContainer",
        width: 800,
        height: 600,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    pixelArt: true,
    disableContextMenu: true,
    scene: [GameScene, UiScene]
});
