import Dungeon from "@mikewesthad/dungeon";
import Room from "./Room";
import Darkness from "./Darkness";

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
            tileWidth: 48,
            tileHeight: 48,
            width: this.dungeon.width,
            height: this.dungeon.height
        });

        const tileset = this.map.addTilesetImage("dungeon", null, 48, 48);
        this.boundaries = this.map.createBlankDynamicLayer("boundaries", tileset);

        const darkLayer = this.map.createBlankDynamicLayer("darkness", tileset).fill(0);
        this.darkness = new Darkness(this, darkLayer);
    };

    generate()
    {
        var boundaries = this.getBoundariesLayer();

        // Fill the world with the blank tile.
        boundaries.fill(0);

        // Create all of the rooms
        this.getDungeon().rooms.forEach(data => {
            this.getRoomInstance(data).generate(boundaries);
        });

        // Hide all of the rooms
        boundaries.forEachTile(function (tile) {
            tile.alpha = 0;
        });
    };

    update (player)
    {
        var playerTileX = this.getBoundariesLayer().worldToTileX(player.sprite.x);
        var playerTileY = this.getBoundariesLayer().worldToTileY(player.sprite.y);
        var playerRoom = this.getDungeon().getRoomAt(playerTileX, playerTileY);
        this.getDarkness().setActiveRoom(playerRoom);
    };

    getRoomInstance(data)
    {
        return new Room(this.getTileMap(), data);
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

    getDarkness()
    {
        return this.darkness;
    }
}
