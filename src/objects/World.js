import Dungeon from "@mikewesthad/dungeon";
import Room from "./Room";
import Shadows from "./Shadows";
import Imp from "./npcs/Imp";
import Drop from "../objects/Drop";
import PhaserNavMesh from "navmesh";

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

        this.tileLayer = this.map.createBlankDynamicLayer("tileLayer", this.tileset);
    };

    generate()
    {
        // Fill the world with the blank tile.
        this.tileLayer.fill(9);

        let navMesh = [];

        // Create all of the rooms
        this.dungeon.rooms.forEach(data => {
            let room = this.getRoomInstance(data);
            navMesh.push(room.generate());

            //let mesh = new PhaserNavMesh(this.scene.navMeshPlugin, "mesh", room.generate());
            //this.scene.navMeshPlugin.PhaserNavMesh["mesh"] = mesh;
        });
        //this.scene.navMeshPlugin.phaserNavMeshes["mesh"] = new NavMesh(navMesh);
        console.log(this.scene.navMeshPlugin);

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
                this.restart();
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

        this.tileLayer.setCollision([3, 7, 10, 11]);

        this.shadows = new Shadows(this, this.tileset);
        this.shadows.cloak(true);
    };

    update ()
    {
        // Get the current position of the player in the scene.
        var playerTileX = this.tileLayer.worldToTileX(this.scene.player.x);
        var playerTileY = this.tileLayer.worldToTileY(this.scene.player.y);

        // Find the room the player is currently in.
        var playerRoom = this.dungeon.getRoomAt(playerTileX, playerTileY);

        // If we can't find the player's room, then freak out.
        if (!playerRoom) {
            alert("I think something has gone wrong here...");
            this.restart();
            return;
        }

        // Set the current room as being active.
        this.shadows.setActiveRoom(playerRoom);

        this.npcs.getChildren().forEach((npc) => {
            npc.update();
        });
    };

    getRoomInstance(data)
    {
        return new Room(this.scene, this.getTileMap(), this.tileLayer, data);
    };

    getFirstRoom()
    {
        let first = this.dungeon.rooms[0];
        return this.getRoomInstance(first);
    };

    getTileMap()
    {
        return this.map;
    };

    addDrop(item, x, y) {
        let drop = new Drop(this.scene, item, x, y);
        this.drops.add(drop);
    };

    restart() {
        // Remove the player object
        this.scene.player.destroy();

        // Remove all Npcs
        this.npcs.clear(true, true);

        // Remove all drops
        this.drops.clear(true, true);

        // Restart the scene.
        this.scene.scene.restart();
    };
}
