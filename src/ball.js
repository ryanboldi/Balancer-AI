class Ball {
    constructor(x, y, rad, engine) {
        this.body = Bodies.circle(x, y, rad, ballSettings);
        this.rad = rad;
        World.add(engine.world, [this.body]);
    }

    draw() {
        push(); //push saves current p5 settings so we can revert to them later
        translate(this.body.position.x, this.body.position.y); //translate to the 'rec' center
        rotate(this.body.angle);
        fill(0);
        stroke(0);
        ellipse(0, 0, this.rad * 2, this.rad * 2); 
        pop();
    }
}