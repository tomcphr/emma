export default class Shadows {
    constructor(scene, tileset) {
        this.layer = scene.map.createBlankDynamicLayer("shadows", tileset);
        this.layer.fill(9);

        this.activeRoom = null;
    };

    setActiveRoom(room) {
        // We only need to update the tiles if the active room has changed
        if (room !== this.activeRoom) {
            this.setRoomAlpha(room, 0);
            if (this.activeRoom) {
                this.setRoomAlpha(this.activeRoom, 0.5);
            }
            this.activeRoom = room;
        }
    };

    setRoomAlpha (room, alpha) {
        this.layer.forEachTile(
            t => (t.alpha = alpha),
            this,
            room.x,
            room.y,
            room.width,
            room.height
        );
    };
}
