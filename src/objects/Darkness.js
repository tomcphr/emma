export default class Darkness {
    constructor(world, layer) {
        this.world = world;
        this.layer = layer;
        this.activeRoom = null;

        this.layer.forEachTile(function (tile) {
            tile.alpha = 0;
        });
    };

    setActiveRoom(room) {
        // We only need to update the tiles if the active room has changed
        if (room !== this.activeRoom) {
            this.setRoomAlpha(room, 1);
            if (this.activeRoom) {
                this.setRoomAlpha(this.activeRoom, 0.5);
            }
            this.activeRoom = room;
        }
    };

    setRoomAlpha (room, alpha) {
        this.world.getRoomInstance(room).setAlpha(alpha);
    };
}
