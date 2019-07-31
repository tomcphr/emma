import Dungeon from "@mikewesthad/dungeon";
import Room from "./Room";
import Shadows from "./Shadows";
import Imp from "./npcs/Imp";
import Drop from "../objects/Drop";
import Pathfinding from "./Pathfinding";

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
                width: {min: 7, max: 8, onlyOdd: true},
                height: {min: 6, max: 8, onlyOdd: true}
            }
        });
        this.tiles = this.dungeon.getMappedTiles({empty: 1, floor: 0, door: 0, wall: 1});

        this.map = scene.make.tilemap({
            tileWidth: 32,
            tileHeight: 32,
            width: this.dungeon.width,
            height: this.dungeon.height
        });

        this.tileset = this.map.addTilesetImage("dungeon", null, 32, 32, 1, 2);

        // Render the tileset as pixel art.
        this.tileset.image.setFilter(Phaser.Textures.FilterMode.NEAREST);

        this.npcs = scene.add.group();
        this.drops = scene.add.group();
    };

    generate()
    {
        this.boundaries = this.map.createBlankDynamicLayer("boundaries", this.tileset);

        // Fill the world with the blank tile.
        this.getBoundariesLayer().fill(9);

        // Create all of the rooms
        this.getDungeon().rooms.forEach(data => {
            this.getRoomInstance(data).generate();
        });

        // Decide what's in each room.
        let rooms = this.dungeon.rooms.slice();

        // Remove the first room.
        let startRoom = rooms.shift();

        // Remove the endroom from the array and populate the exit.
        let randomRoom = Phaser.Utils.Array.RemoveRandomElement(rooms);
        let exitTile = this.getRoomInstance(randomRoom).placeAndGetExitTile();
        exitTile.setCollisionCallback((sprite, tile) =>  {
            // Only allow the player to trigger the reset.
            if (sprite !== this.scene.player) {
                return;
            }

            this.scene.events.emit("downWeGo");

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

                // Remove all drops
                this.drops.clear(true, true);

                // Restart the scene.
                this.scene.scene.restart();
            });

            return true;
        });

        // Loop around the remaining rooms and randomize
        let depth = this.scene.getDepth();
        let otherRooms = Phaser.Utils.Array.Shuffle(rooms).slice(0, rooms.length * 0.9);
        otherRooms.forEach(data => {
            var random = Math.random()

            let chance = (10 + (depth * 2)) / 100;

            // Cap out the chance of spawning
            if (chance > 35) {
                chance = 35;
            }

            if (random <= chance) {
                var worldX = this.map.tileToWorldX(data.centerX);
                var worldY = this.map.tileToWorldY(data.centerY);
                new Imp(this.scene, worldX, worldY);
            }
        });

        this.getBoundariesLayer().setCollisionByExclusion([1, 2, 4, 5, 6, 8]);

        this.shadows = new Shadows(this, this.tileset);
        this.shadows.cloak(true);
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

    findPath(fromSprite, toSprite)
    {
        let pathfinding = new Pathfinding(this.scene, this.tiles, this.map);
        return pathfinding.findPath(fromSprite.x, fromSprite.y, toSprite.x, toSprite.y);
    }

    getRoomInstance(data)
    {
        return new Room(this.scene, this.getTileMap(), this.getBoundariesLayer(), data);
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
    };

    addDrop(item, x, y) {
        let drop = new Drop(this.scene, item, x, y);
        this.drops.add(drop);
    };
}
