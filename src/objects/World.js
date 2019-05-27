import Dungeon from "@mikewesthad/dungeon";
import Room from "./Room";
import Shadows from "./Shadows";
import Imp from "../objects/npcs/Imp";

export default class World
{
    constructor(scene)
    {
        this.scene = scene;

        this.dungeon = new Dungeon({
            width: 25,
            height: 25,
            doorPadding: 2,
            rooms: {
                width: {min: 7, max: 13, onlyOdd: true},
                height: {min: 7, max: 13, onlyOdd: true}
            }
        });

        this.map = scene.make.tilemap({
            tileWidth: 32,
            tileHeight: 32,
            width: this.dungeon.width,
            height: this.dungeon.height
        });

        const tileset = this.map.addTilesetImage("dungeon", null, 32, 32);

        this.npcs = scene.add.group();
    };

    generate()
    {
        // Fill the world with the blank tile.
        this.getBoundariesLayer().fill(9);

        // Create all of the rooms
        this.getDungeon().rooms.forEach(data => {
            this.getRoomInstance(data).generate();
        });

        // Decide what's in each room.
        let rooms = this.dungeon.rooms.slice();
        let startRoom = rooms.shift();

        let endRoom = this.getRoomInstance(Phaser.Utils.Array.RemoveRandomElement(rooms));
        endRoom.exit(() =>  {
            // Hold the player in place.
            this.scene.player.freeze();
            this.npcs.getChildren().forEach((npc) => {
                npc.freeze();
            });

            let camera = this.scene.cameras.main;

            // Fade the camera to black
            camera.fade(250, 0, 0, 0);

            // When the camera has faded, restart the scene.
            camera.once("camerafadeoutcomplete", () =>  {
                // Remove the player object
                this.scene.player.destroy();

                // Remove all Npcs
                this.npcs.clear(true, true);

                // Restart the scene.
                this.scene.scene.restart();
            });
        });

        let otherRooms = Phaser.Utils.Array.Shuffle(rooms).slice(0, rooms.length * 0.9);
        otherRooms.forEach(data => {
            var rand = Math.random();

            // 25% of 1 imp
            if (rand <= 0.25) {
                var worldX = this.map.tileToWorldX(data.centerX);
                var worldY = this.map.tileToWorldY(data.centerY);

                (new Imp(this.scene, worldX, worldY));
            }
        });

    };

    update ()
    {
        // Get the current position of the player in the scene.
        var playerTileX = this.getBoundariesLayer().worldToTileX(this.scene.player.x);
        var playerTileY = this.getBoundariesLayer().worldToTileY(this.scene.player.y);

        // Find the room the player is currently in.
        var playerRoom = this.getDungeon().getRoomAt(playerTileX, playerTileY);

        // Set the current room as being active.
        this.getShadows().setActiveRoom(playerRoom);

        this.npcs.getChildren().forEach((npc) => {
            npc.update();
        });
    };

    getRoomInstance(data)
    {
        return new Room(this.getTileMap(), this.getBoundariesLayer(), data);
    };

    getFirstRoom()
    {
        let first = this.getDungeon().rooms[0];
        return this.getRoomInstance(first);
    };

    getDungeon()
    {
        return this.dungeon;
    };

    getTileMap()
    {
        return this.map;
    };

    getBoundariesLayer()
    {
        if (!this.boundaries) {
            this.generate();
        }
        return this.boundaries;
    };

    getShadows()
    {
        return this.shadows;
    }
}
