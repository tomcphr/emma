export default class Room
{
    constructor (map, data)
    {
        this.map = map;
        this.data = data;
    };

    setAlpha (alpha)
    {
        this.map.forEachTile(function (tile) {
            tile.alpha = alpha;
        }, this, this.data.x, this.data.y, this.data.width, this.data.height);
    };

    getSpawnX ()
    {
        return this.map.tileToWorldX(this.data.x + 1);
    };

    getSpawnY ()
    {
        return this.map.tileToWorldY(this.data.y + 1);
    };

    generate (boundariesLayer, touchableLayer)
    {
        // These room properties are all in grid units (not pixels units)
        const { x, y, width, height, left, right, top, bottom } = this.data;

        // Fill the room (minus the walls) with mostly clean floor tiles (90% of the time), but
        // occasionally place a dirty tile (10% of the time).
        touchableLayer.weightedRandomize(x + 1, y + 1, width - 2, height - 2, [
            { index: 1, weight: 9 }, // 9/10 times, use index 1
            { index: [1], weight: 1 } // 1/10 times, randomly pick 1
        ]);

        // Place the room corners tiles
        boundariesLayer.putTileAt(0, left, top);
        boundariesLayer.putTileAt(0, right, top);
        boundariesLayer.putTileAt(0, right, bottom);
        boundariesLayer.putTileAt(0, left, bottom);

        // Place the non-corner wall tiles using fill with x, y, width, height parameters
        boundariesLayer.fill(0, left + 1, top, width - 2, 1); // Top
        boundariesLayer.fill(0, left + 1, bottom, width - 2, 1); // Bottom
        boundariesLayer.fill(0, left, top + 1, 1, height - 2); // Left
        boundariesLayer.fill(0, right, top + 1, 1, height - 2); // Right

        // Allow the users to walk through walls
        var doors = room.getDoorLocations();
        for (var i = 0; i < doors.length; i++)
        {
            let doorX = x + doors[i].x;
            let doorY = y + doors[i].y;

            boundariesLayer.removeTileAt(doorX, doorY);
            touchableLayer.putTileAt(1, doorX, doorY);
        }
    };
};
