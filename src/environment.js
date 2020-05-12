class Environment {
    constructor(x, y, width, height, genome) {
        this.x = x;
        this.y = y;
        this.w = width;
        this.h = height;
        //this.player = new Player(genome);

        this.engine = Engine.create();

        this.ball = new Ball(this.x + (this.w / 2), this.y + (this.h * 0.1), this.w / 32, this.engine);
        this.player = new Player(this.x + (this.w / 2), this.y + (this.h * 0.75), this.w * PlayerWidth, this.h / 20, this.engine);

        Engine.run(this.engine);
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
        }
        this.ball.draw();
        this.player.draw();
    }
}