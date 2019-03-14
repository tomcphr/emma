export default class Player
{
    constructor (scene, layer, width, height) {
        this.scene = scene;
        this.width = width * layer.scaleX;
        this.height = height * layer.scaleY;

        this.graphics = scene.add.graphics({fillStyle: { color: 0xedca40, alpha: 1 }});
    };

    draw () {
        return this.graphics.fillRect(0, 0, this.width, this.height);
    };

    move (time, cursors) {
        var repeatMoveDelay = 100;

        if (time > (this.lastMove + repeatMoveDelay)) {
            if (cursors.down.isDown)
            {
                if (isTileOpenAt(this.x, this.y + this.height))
                {
                    this.y += this.height;
                    this.lastMove = time;
                }
            }
            else if (cursors.up.isDown)
            {
                if (isTileOpenAt(this.x, this.y - this.height))
                {
                    this.y -= this.height;
                    this.lastMove = time;
                }
            }

            if (cursors.left.isDown)
            {
                if (isTileOpenAt(this.x - this.width, this.y))
                {
                    this.x -= this.width;
                    this.lastMove = time;
                }
            }
            else if (cursors.right.isDown)
            {
                if (isTileOpenAt(this.x + this.width, this.y))
                {
                    this.x += this.width;
                    this.lastMove = time;
                }
            }
        }
    };
}
