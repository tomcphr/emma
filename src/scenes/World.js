import Dungeon from "@mikewesthad/dungeon";

export default class World extends Phaser.Scene
{
    constructor () {
        super();
        this.floor = 0;
    };

    preload () {
        let assets = "../../assets";
        this.load.image("tiles", assets + "/tilesets/dungeon.png");
    };

    create () {
        this.dungeon = new Dungeon({
            width: 50,
            height: 50,
            doorPadding: 2,
            rooms: {
                width: {min: 7, max: 15, onlyOdd: true},
                height: {min: 7, max: 15, onlyOdd: true}
            }
        });

        // Creating a blank tilemap with dimensions matching the dungeon
        const map = this.make.tilemap({
            tileWidth: 48,
            tileHeight: 48,
            width: this.dungeon.width,
            height: this.dungeon.height
        });

        const tileset = map.addTilesetImage("tiles", null, 32, 32);
        this.boundaries = map.createBlankDynamicLayer("boundaries", tileset);
        this.interactable = map.createBlankDynamicLayer("interactable", tileset);

        // Set all tiles in the boundaries layer with blank tiles (purple-black tile)
        this.boundaries.fill(1);

        this.dungeon.rooms.forEach(room => {
            //this.createRoom(room);
        });
    };

    update () {
    };

    generate (room) {
      // These room properties are all in grid units (not pixels units)
      const { x, y, width, height, left, right, top, bottom } = room;

      // Fill the room (minus the walls) with mostly clean floor tiles (90% of the time), but
      // occasionally place a dirty tile (10% of the time).
      this.boundaries.weightedRandomize(x + 1, y + 1, width - 2, height - 2, [
        { index: 6, weight: 9 }, // 9/10 times, use index 6
        { index: [7, 8, 26], weight: 1 } // 1/10 times, randomly pick 7, 8 or 26
      ]);

      // Place the room corners tiles
      this.boundaries.putTileAt(1, left, top);
      this.boundaries.putTileAt(4, right, top);
      this.boundaries.putTileAt(23, right, bottom);
      this.boundaries.putTileAt(22, left, bottom);

      // Place the non-corner wall tiles using fill with x, y, width, height parameters
      this.boundaries.fill(39, left + 1, top, width - 2, 1); // Top
      this.boundaries.fill(1, left + 1, bottom, width - 2, 1); // Bottom
      this.boundaries.fill(21, left, top + 1, 1, height - 2); // Left
      this.boundaries.fill(19, right, top + 1, 1, height - 2); // Right
    }
}
