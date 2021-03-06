class Environment {
    constructor(x, y, width, height, genome) {
        this.x = x;
        this.y = y;
        this.w = width;
        this.h = height;

        //this.player = new Player(genome);
        this.engine = Engine.create();

        this.ball = new Ball(this.x + (this.w / 2), this.y + (this.h * 0.1), this.w / 32, this.engine);
        //this.player = new Player(this.x + random(winWallWidth, (this.w - winWallWidth - (this.w * PlayerWidth))), this.y + (this.h * 0.75), this.w * PlayerWidth, this.h / 20, this.engine, genome);
        this.player = new Player(this.x + this.w / 1.4, this.y + (this.h * 0.75), this.w * PlayerWidth, this.h / 20, this.engine, genome);

        //WHICH WALL TO BE THE WINNING ONE
        //this.left = (random(0, 1) < 0.5);
        this.left = true;
        this.winningWall = (this.left ? this.x + (winWallWidth / 2) : this.x + (this.w - (winWallWidth / 2)));
        this.losingWall = (this.left ? this.x + (this.w - (winWallWidth / 2)) : this.x + (winWallWidth / 2));

        //add the walls to the world. 
        this.winWall = Bodies.rectangle(this.winningWall, this.y + (this.h / 2), winWallWidth, this.h, wallSettings);
        this.loseWall = Bodies.rectangle(this.losingWall, this.y + (this.h / 2), winWallWidth, this.h, wallSettings);

        World.add(this.engine.world, [this.winWall, this.loseWall]);

        Engine.run(this.engine);

        this.fitness = 0;
        this.lastActive = 0;
    }

    fitness() {
        this.fitness = this.player.brain.score;
        return this.fitness;
    }

    draw() {
        if (!this.player.alive) {
            fill(255, 0, 0, 15);
            noStroke();
            rect(this.x + (this.w / 2), this.y + (this.h / 2), this.w, this.h);
            stroke(255, 0, 0);
            strokeWeight(2);
            line(this.x, this.y, this.x + this.w, this.y + this.h);
            line(this.x, this.y + this.h, this.x + this.w, this.y);
        } else {
            fill(0, 255, 0);//green
            noStroke();
            rect(this.winningWall, this.y + (this.h / 2), winWallWidth, this.h);
            fill(255, 0, 0);
            rect(this.losingWall, this.y + (this.h / 2), winWallWidth, this.h);

            noFill();
            strokeWeight(0.5);
            stroke(0, 0, 0);
            rect(this.x + (this.w / 2), this.y + (this.h / 2), this.w, this.h);
            this.ball.draw();
        }
        this.player.draw();
    }

    update() {
        this.lastActive += 1;
        this.player.think(this);
        this.fitness = this.player.brain.score;
    }

    checkDeath() {
        if (this.player.body.bounds.min.x < (this.x + winWallWidth)) { this.player.alive = false }
        if (this.player.body.bounds.max.x > (this.x + this.w - winWallWidth)) { this.player.alive = false }
        if (this.ball.body.position.y > this.y + this.h) { this.player.alive = false }


        //if ball is in contact with the winning side.
        if (this.player.alive) {
            if (Matter.SAT.collides(this.ball.body, this.winWall).collided) {
                this.player.brain.score += 10;
                this.lastActive = 0;
            }

            if (Matter.SAT.collides(this.ball.body, this.loseWall).collided) {
                this.player.alive = false;
            }
        }
        if (this.lastActive > activeTimeSteps) {
            this.player.alive = false;
            console.log("creature timed out");
        }
    }
}