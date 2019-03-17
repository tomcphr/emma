export default class Room
{
    constructor(map, layer, data)
    {
        this.map = map;
        this.layer = layer;
        this.data = data;
    };

    setAlpha(alpha)
    {
        this.map.forEachTile(function (tile) {
            tile.alpha = alpha;
        }, this, this.data.x, this.data.y, this.data.width, this.data.height);
    };

    getSpawnX()
    {
        return this.map.tileToWorldX(this.data.centerX);
    };

    getSpawnY()
    {
        return this.map.tileToWorldY(this.data.centerY);
    };

    generate()
    {
        // These room properties are all in grid units (not pixels units)
        const { x, y, width, height, left, right, top, bottom } = this.data;

        // Create the room.
        this.placeRoom(x, y, width, height, left, right, top, bottom);
    };

    placeRoom(x, y, width, height, left, right, top, bottom)
    {
        // Fill the room (minus the walls) with mostly clean floor tiles (90% of the time), but
        // occasionally place a dirty tile (10% of the time).
        this.layer.weightedRandomize(x + 1, y + 1, width - 2, height - 2, [
            { index: 2, weight: 9 }, // 9/10 times, use index 1
            { index: [2], weight: 1 } // 1/10 times, randomly pick 1
        ]);

        // Place the room corners tiles
        this.layer.putTileAt(1, left, top);
        this.layer.putTileAt(1, right, top);
        this.layer.putTileAt(1, right, bottom);
        this.layer.putTileAt(1, left, bottom);

        // Place the non-corner wall tiles using fill with x, y, width, height parameters
        this.layer.fill(1, left + 1, top, width - 2, 1); // Top
        this.layer.fill(1, left + 1, bottom, width - 2, 1); // Bottom
        this.layer.fill(1, left, top + 1, 1, height - 2); // Left
        this.layer.fill(1, right, top + 1, 1, height - 2); // Right

        // Allow the users to walk through walls
        var doors = this.data.getDoorLocations();
        for (var i = 0; i < doors.length; i++)
        {
            let doorX = x + doors[i].x;
            let doorY = y + doors[i].y;

            this.layer.putTileAt(2, doorX, doorY);
        }
    };
};
