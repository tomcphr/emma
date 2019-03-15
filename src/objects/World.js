import Dungeon from "@mikewesthad/dungeon";
import Room from "./Room";

export default class World
{
    constructor(scene)
    {
        this.dungeon = new Dungeon({
            width: 100,
            height: 100,
            doorPadding: 2,
            rooms: {
                width: {min: 7, max: 15, onlyOdd: true},
                height: {min: 7, max: 15, onlyOdd: true}
            }
        });

        this.map = scene.make.tilemap({
            tileWidth: 32,
            tileHeight: 32,
            width: this.dungeon.width,
            height: this.dungeon.height
        });

        const tileset = this.map.addTilesetImage("dungeon", null, 32, 32);
        this.boundaries = this.map.createBlankDynamicLayer("boundaries", tileset);
    };

    generate()
    {
        // Fill the world with the blank tile.
        this.boundaries.fill(0);

        // Create all of the rooms
        this.dungeon.rooms.forEach(data => {
            let room = new Room(this.map, data);
            room.generate(this.boundaries);
        });

        // Hide all of the rooms
        this.boundaries.forEachTile(function (tile) {
            tile.alpha = 0;
        });
    };

    getFirstRoom()
    {
        return new Room(this.map, this.dungeon.rooms[0]);
    }

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
}
