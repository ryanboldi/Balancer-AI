class Environment {
    constructor(x, y, width, height, genome) {
        this.x = x;
        this.y = y;
        this.w = width;
        this.h = height;

        //this.player = new Player(genome);

        this.engine = Engine.create();

        this.ball = new Ball(this.x + (this.w / 2), this.y + (this.h * 0.1), this.w / 32, this.engine);
        this.player = new Player(this.x + (this.w / 1.2), this.y + (this.h * 0.75), this.w * PlayerWidth, this.h / 20, this.engine, genome);

        Engine.run(this.engine);

        //WHICH WALL TO BE THE WINNING ONE
        let left = (random(0, 1) < 0.5);
        this.winningWall = (left ? this.x + (winWallWidth / 2) : this.x + (this.w - (winWallWidth / 2)));
        this.losingWall = (left ? this.x + (this.w - (winWallWidth / 2)) : this.x + (winWallWidth / 2));
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
        this.player.think(this);
    }

    checkDeath() {
        if (this.player.body.bounds.min.x < this.x) { this.player.alive = false }
        if (this.player.body.bounds.max.x > this.x + this.w) { this.player.alive = false }
        if (this.ball.body.position.y > this.y + this.h) { this.player.alive = false }
    }
}