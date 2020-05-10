const WIDTH = 800;
const HEIGHT = 800;

//bunch of module aliases
let Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;

let env;

function setup() {
    //RECTANGLES NOW DEFINED BY THIER CENTER POINT.
    rectMode(CENTER);
    createCanvas(WIDTH, HEIGHT);
    env = new Environment(0, 0, WIDTH, HEIGHT);
}

function draw() {
    background(190);
    env.draw();

}