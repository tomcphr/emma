import Dungeon from "@mikewesthad/dungeon";
import Room from "./Room";
import Shadows from "./Shadows";

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
            tileWidth: 48,
            tileHeight: 48,
            width: this.dungeon.width,
            height: this.dungeon.height
        });

        const tileset = this.map.addTilesetImage("dungeon", null, 48, 48);

        this.boundaries = this.map.createBlankDynamicLayer("boundaries", tileset);
        this.interactable = this.map.createBlankDynamicLayer("interactable", tileset);
        this.shadows = new Shadows(this, tileset);
    };

    generate()
    {
        // Fill the world with the blank tile.
        this.getBoundariesLayer().fill(0);

        // Create all of the rooms
        this.getDungeon().rooms.forEach(data => {
            this.getRoomInstance(data).generate();
        });

        // Decide what's in each room.
        let rooms = this.dungeon.rooms.slice();
        let startRoom = rooms.shift();

        let endRoom = this.getRoomInstance(Phaser.Utils.Array.RemoveRandomElement(rooms));
        endRoom.markExit(() =>  {
            // Hold the player in place.
            this.scene.player.freeze();

            let camera = this.scene.cameras.main;
            camera.fade(250, 0, 0, 0);
            // Bug? player sprite not re-creating correctly.
            camera.once("camerafadeoutcomplete", () =>  {
                // Remove the player object
                this.scene.player.destroy();

                // Restart the scene.
                this.scene.scene.restart();
            });
        });

        let otherRooms = Phaser.Utils.Array.Shuffle(rooms).slice(0, rooms.length * 0.9);

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
        return this.boundaries;
    };

    getShadows()
    {
        return this.shadows;
    }
}
