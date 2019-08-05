import GameScene from "./scenes/GameScene";
import UiScene from "./scenes/UiScene";

window.onload = new Phaser.Game({
    type: Phaser.AUTO,
    backgroundColor: "#000",
    physics: {
        default: "arcade",
        arcade: {
            gravity: {y: 0},
            debug: false
        }
    },
    scale: {
        parent: "gameContainer",
        width: 800,
        height: 600,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    disableContextMenu: true,
    scene: [GameScene, UiScene],
    plugins: {
        scene: [
            {
                key: "PhaserNavMeshPlugin", // Key to store the plugin class under in cache
                plugin: PhaserNavMeshPlugin, // Class that constructs plugins
                mapping: "navMeshPlugin", // Property mapping to use for the scene, e.g. this.navMeshPlugin
                start: true
            }
        ]
    },
});
