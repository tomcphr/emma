import Dungeon from "@mikewesthad/dungeon";
import Player from "../objects/Player";

export default class World extends Phaser.Scene
{
    constructor () {
        super();
        this.floor = 0;
    };

    preload () {
        let assets = "../../assets";
        this.load.image("dungeon", assets + "/tilesets/dungeon.png");
    };

    create () {
        this.dungeon = new Dungeon({
            width: 100,
            height: 100,
            doorPadding: 2,
            rooms: {
                width: {min: 7, max: 15, onlyOdd: true},
                height: {min: 7, max: 15, onlyOdd: true}
            }
        });

        // Creating a blank tilemap with dimensions matching the dungeon
        this.map = this.make.tilemap({
            tileWidth: 32,
            tileHeight: 32,
            width: this.dungeon.width,
            height: this.dungeon.height
        });

        const tileset = this.map.addTilesetImage("dungeon", null, 32, 32);
        this.boundaries = this.map.createBlankDynamicLayer("boundaries", tileset);
        this.boundaries.fill(0);

        this.touchable = this.map.createBlankDynamicLayer("touchable", tileset);

        this.dungeon.rooms.forEach(room => {
            this.generateRoom(room);
        });

        this.hideLayer(this.boundaries);
        this.hideLayer(this.touchable);

        let firstRoom = this.dungeon.rooms[0];

        this.player = (new Player(this, this.boundaries, this.map.tileWidth, this.map.tileHeight)).draw();
        this.player.x = this.map.tileToWorldX(firstRoom.x + 1);
        this.player.y = this.map.tileToWorldY(firstRoom.y + 1);
        this.setRoomAlpha(firstRoom, 1);

        this.cameras.main.startFollow(this.player);
        this.cursors = this.input.keyboard.createCursorKeys();
    };

    update (time) {
        ///this.player.move(time, this.cursors);
    };

    generateRoom (room) {
        // These room properties are all in grid units (not pixels units)
        const { x, y, width, height, left, right, top, bottom } = room;

        // Fill the room (minus the walls) with mostly clean floor tiles (90% of the time), but
        // occasionally place a dirty tile (10% of the time).
        this.touchable.weightedRandomize(x + 1, y + 1, width - 2, height - 2, [
            { index: 1, weight: 9 }, // 9/10 times, use index 1
            { index: [1], weight: 1 } // 1/10 times, randomly pick 1
        ]);

        // Place the room corners tiles
        this.boundaries.putTileAt(0, left, top);
        this.boundaries.putTileAt(0, right, top);
        this.boundaries.putTileAt(0, right, bottom);
        this.boundaries.putTileAt(0, left, bottom);

        // Place the non-corner wall tiles using fill with x, y, width, height parameters
        this.boundaries.fill(0, left + 1, top, width - 2, 1); // Top
        this.boundaries.fill(0, left + 1, bottom, width - 2, 1); // Bottom
        this.boundaries.fill(0, left, top + 1, 1, height - 2); // Left
        this.boundaries.fill(0, right, top + 1, 1, height - 2); // Right

        // Allow the users to walk through walls
        var doors = room.getDoorLocations();
        for (var i = 0; i < doors.length; i++)
        {
            let doorX = x + doors[i].x;
            let doorY = y + doors[i].y;

            this.boundaries.removeTileAt(doorX, doorY);
            this.touchable.putTileAt(1, doorX, doorY);
        }
    };

    setRoomAlpha(room, alpha)
    {
        this.map.forEachTile(function (tile) {
            tile.alpha = alpha;
        }, this, room.x, room.y, room.width, room.height)
    };

    hideLayer (layer) {
        layer.forEachTile(function (tile) {
            tile.alpha = 0;
        });
    };
}
