//THIS CLASS will control the local settings of each individual player.
class Player {
    constructor(x, y, width, height, engine, genome) {
        this.body = Bodies.rectangle(x, y, width, height, playerSettings);
        World.add(engine.world, [this.body]);

        this.width = width;
        this.height = height;

        this.alive = true;
        this.brain = genome;
        this.brain.score = 0;
        this.fitness = 0;
    }

    fitness(){
        this.fitness = this.brain.score;
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

    think(env) {
        //detect, and then move
        //TEMPORARY CONTROLS
        //q -> 81, e -> 69
        if (this.alive) {
            // if (keyIsDown(UP_ARROW)) {
            //     Body.translate(this.body, { x: 0, y: -PlayerSpeed });
            //     //move up
            // }
            // if (keyIsDown(DOWN_ARROW)) {
            //     Body.translate(this.body, { x: 0, y: PlayerSpeed });
            //     //move down
            // }

            //get inputs


            //INPUT 1 -> ANGLE TO UPWARD NORMAL
            let n = createVector(0, 1);
            //vector from top right corner to top left corner
            let bodyVec = createVector(this.body.vertices[1].x - this.body.vertices[0].x, this.body.vertices[1].y - this.body.vertices[0].y);
            let I1 = (bodyVec.angleBetween(n)); //between 0 and pi
            let input1 = map(I1, 0, Math.PI, -1, 1);

            //INPUT 2 -> distance to ball y
            let I2 = (Math.abs(env.ball.body.position.y - this.body.position.y));
            let input2 = map(I2, 0, Math.abs(this.body.position.y - env.y), -1, 1);

            //INPUT 3 -> distance to ball x
            let I3 = (Math.abs(env.ball.body.position.x - this.body.position.x));
            let input3 = map(I3, 0, env.w - (this.width), -1, 1);

            //INPUT 4 ->  velocity of ball x
            let I4 = (env.ball.body.velocity.x);
            let input4 = map(I4, 0, 1, -1, 1);

            //INPUT 5 ->  velocity of ball y
            let I5 = (env.ball.body.velocity.y);
            let input5 = map(I5, 0, 10, -1, 1);

            let ballVec = createVector(env.ball.body.position.x - this.body.position.x, env.ball.body.position.y - this.body.position.y);
            let I6 = (bodyVec.angleBetween(ballVec));
            let input6 = map(I6, 0, Math.PI, -1, 1);

            //ADD 7th INPUT, which is which wall is the winning wall.
            let input7 = (env.left ? -1 : 1);//-1 if left wall is wining, 1 if right wall is winning


            let inputs = [input1, input2, input3, input4, input5, input6, input7];
            let outputs = this.brain.activate(inputs);

            if (outputs[0] > 0.5) {
                Body.translate(this.body, { x: -PlayerSpeed, y: 0 });
                //move left
            }
            if (outputs[1] > 0.5) {
                Body.translate(this.body, { x: PlayerSpeed, y: 0 });
                //move right
            }
            if (outputs[2] > 0.5) {
                Body.rotate(this.body, (Math.PI / (432)) * PlayerSpeed);
            }
            if (outputs[3] > 0.5) {
                Body.rotate(this.body, -(Math.PI / 432) * PlayerSpeed);
            }
        }
    }
}