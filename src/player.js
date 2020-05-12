//THIS CLASS will control the local settings of each individual player.
class Player {
    constructor(x, y, width, height, engine) {
        this.body = Bodies.rectangle(x, y, width, height, playerSettings);
        World.add(engine.world, [this.body]);

        this.width = width;
        this.height = height;
    }

    draw() {
        push(); //push saves current p5 settings so we can revert to them later
        translate(this.body.position.x, this.body.position.y);
        rotate(this.body.angle);
        fill(100, 31, 31);
        noStroke();
        rect(0, 0, this.width, this.height);
        pop();
    }
}