import Dungeon from "@mikewesthad/dungeon";
import Room from "./Room";
import Shadows from "./Shadows";
import Imp from "./npcs/Imp";
import Drop from "../objects/Drop";
import NavMesh from "navmesh";

export default class World
{
    constructor(scene)
    {
        this.scene = scene;

        this.dungeon = new Dungeon({
            width: 25,
            height: 25,
            rooms: {
                width: {min: 7, max: 12, onlyOdd: true},
                height: {min: 6, max: 12, onlyOdd: true}
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

        // Create all of the rooms
        this.dungeon.rooms.forEach(data => {
            this.getRoomInstance(data).generate();
        });

        this.tileLayer.setCollision([3, 7, 9, 10, 11]);

        let mesh = [];
        this.dungeon.rooms.forEach(data => {
            let room = []; 
            let tiles = this.map.getTilesWithin(data.x + 1, data.y + 1, data.width - 2, data.height - 2);

            tiles.forEach((tile) => {
                if (tile.collides === true) {
                    return;
                };
                room.push({
                    x: this.map.tileToWorldX(tile.x), 
                    y: this.map.tileToWorldY(tile.y)
                });
            });

            mesh.push(room);
        })

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
        
        this.navMesh = new NavMesh(mesh);

        this.shadows = new Shadows(this, this.tileset);
        this.shadows.cloak(true);

        this.debugGraphics = this.scene.add.graphics();
    };

    update ()
    {
        // Get the current position of the player in the scene.
        let playerTile = this.getTileXY(this.scene.player.x, this.scene.player.y);

        // Find the room the player is currently in.
        var playerRoom = this.dungeon.getRoomAt(playerTile.x, playerTile.y);

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

        this.scene.wanderer.goTo(this.scene.player.position);

        //let wanderTile = this.getTileXY(this.scene.wanderer.x, this.scene.wanderer.y);

        //let wanderWorldXY = this.getWorldFromTileXY(wanderTile.x, wanderTile.y);
        //let playerWorldXY = this.getWorldFromTileXY(playerTile.x, playerTile.y);

        //let path = this.navMesh.findPath(wanderWorldXY, playerWorldXY);

        this.debugGraphics.clear();
        this.debugDrawPath(this.scene.wanderer.path);
    };

    debugDrawMesh({
        palette = [0x00a0b0, 0x6a4a3c, 0xcc333f, 0xeb6841, 0xedc951]
    } = {}) {
        if (!this.debugGraphics) return;

        const navPolys = this.navMesh.getPolygons();

        navPolys.forEach(poly => {
            const color = palette[poly.id % palette.length];
            this.debugGraphics.fillStyle(color);
            this.debugGraphics.fillPoints(poly.getPoints());
        });
    }

    debugDrawPath(path, color = 0x00ff00, thickness = 10, alpha = 1) {
        if (!this.debugGraphics) return;

        if (path && path.length) {
            // Draw line for path
            this.debugGraphics.lineStyle(thickness, color, alpha);
            this.debugGraphics.strokePoints(path);

            // Draw circle at start and end of path
            this.debugGraphics.fillStyle(color, alpha);
            const d = 1.2 * thickness;
            this.debugGraphics.fillCircle(path[0].x, path[0].y, d, d);

            if (path.length > 1) {
                const lastPoint = path[path.length - 1];
                this.debugGraphics.fillCircle(lastPoint.x, lastPoint.y, d, d);
            }
        }
    }

    getTileXY(x, y)
    {
        let tileX = this.tileLayer.worldToTileX(x);
        let tileY = this.tileLayer.worldToTileY(y);
        return {x: tileX, y: tileY};
    };

    getWorldFromTileXY(x, y)
    {
        let worldX = this.tileLayer.tileToWorldX(x);
        let worldY = this.tileLayer.tileToWorldY(y);
        return {x: worldX, y: worldY};
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
