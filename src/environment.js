class Environment {
    constructor(x, y, width, height, genome) {
        this.x = x;
        this.y = y;
        this.w = width;
        this.h = height;
        //this.player = new Player(genome);

        this.engine = Engine.create();

        this.ball = new Ball(this.x + (this.w / 2), this.y + (this.h * 0.1), this.w / 32, this.engine);
        this.player = new Player(this.x + (this.w / 2), this.y + (this.h * 0.75), this.w / 4, this.h / 20, this.engine);

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
        // push(); //push saves current p5 settings so we can revert to them later
        // console.log(this.rec.angle);
        // translate(this.rec.position.x, this.rec.position.y); //translate to the 'rec' center
        // rotate(this.rec.angle);
        // fill(0);
        // stroke(0);
        // //MOVE THIS TO PLAYER CLASS EVENTUALLY
        // rect(0, 0, 80, 80); //THESE WIDTHS will be assigned through a wrapper function, unless i decide to draw it with matter.js instead of p5.js
        // pop();
    }
}