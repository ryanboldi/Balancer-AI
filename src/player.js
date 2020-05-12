//THIS CLASS will control the local settings of each individual player.
class Player {
    constructor(x, y, width, height, engine) {
        this.body = Bodies.rectangle(x, y, width, height, playerSettings);
        World.add(engine.world, [this.body]);

        this.width = width;
        this.height = height;

        this.alive = true;
    }

    draw() {
        push(); //push saves current p5 settings so we can revert to them later
        translate(this.body.position.x, this.body.position.y);
        rotate(this.body.angle);
        fill(100, 31, 31);
        noStroke();
        rect(0, 0, this.width, this.height);
        pop();

        //TEMPORARY CONTROLS
        //q -> 81, e -> 69

        if (keyIsDown(UP_ARROW)) {
            Body.translate(this.body, { x: 0, y: -PlayerSpeed });
            //move up
        }
        if (keyIsDown(DOWN_ARROW)) {
            Body.translate(this.body, { x: 0, y: PlayerSpeed });
            //move down
        }
        if (keyIsDown(LEFT_ARROW)) {
            Body.translate(this.body, { x: -PlayerSpeed, y: 0 });
            //move left
        }
        if (keyIsDown(RIGHT_ARROW)) {
            Body.translate(this.body, { x: PlayerSpeed, y: 0 });
            //move right
        }
        if (keyIsDown(81)) {
            Body.rotate(this.body, (Math.PI / (72)) * PlayerSpeed);
        }
        if (keyIsDown(69)) {
            Body.rotate(this.body, -(Math.PI / 72) * PlayerSpeed);
        }
    }
}