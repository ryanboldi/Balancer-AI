class Environment {
    constructor(x, y, width, height, genome) {
        this.x = x;
        this.y = y;
        this.w = width;
        this.h = height;
        //this.player = new Player(genome);

        this.engine = Engine.create();
        this.rec = Bodies.rectangle(400, 200, 80, 80);
        console.log(this.rec.width);
        World.add(this.engine.world, [this.rec]);
        Engine.run(this.engine);
    }

    draw() {
        push(); //push saves current p5 settings so we can revert to them later
        translate(this.rec.position.x, this.rec.position.y); //translate to the 'rec' center
        fill(0);
        stroke(0);
        //MOVE THIS TO PLAYER CLASS EVENTUALLY
        rect(0, 0, 80, 80); //THESE WIDTHS will be assigned through a wrapper function, unless i decide to draw it with matter.js instead of p5.js
        pop();
    }
}