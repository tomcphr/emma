export default class Pathfinding {
    constructor(scene, matrix, tilemap) {
        this.scene = scene;

        this.tilemap = tilemap;

        let pathFinding = require("pathfinding");

        this.matrix = new pathFinding.Grid(matrix);
        this.finder = new pathFinding.AStarFinder();
    };

    findPath(fromX, fromY, toX, toY)
    {
        let fromTileX = this.tilemap.worldToTileX(fromX);
        let fromTileY = this.tilemap.worldToTileY(fromY);
        let toTileX = this.tilemap.worldToTileX(toX);
        let toTileY = this.tilemap.worldToTileY(toY);

        let tilePath = this.finder.findPath(fromTileX, fromTileY, toTileX, toTileY, this.matrix);

        let xyPath = [];
        if (tilePath) {
            for (var i = 0; i < tilePath.length; i++) {
                let tileX = tilePath[i][0];
                let tileY = tilePath[i][1];

                let stepX = this.tilemap.tileToWorldX(tileX);
                let stepY = this.tilemap.tileToWorldY(tileY);

                if (fromTileX === tileX && fromTileY === tileY) {
                    continue;
                }

                xyPath.push({"x" : stepX, "y" : stepY});
            }
        }

        xyPath.pop();

        return xyPath;
    };
};
