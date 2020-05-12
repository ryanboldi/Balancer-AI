const WIDTH = 800;
const HEIGHT = 800;

const PlayerSpeed = 1;

//bunch of module aliases
let Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Body = Matter.Body,
    Bodies = Matter.Bodies;

let env;

function setup() {
    frameRate(120);
    //RECTANGLES NOW DEFINED BY THIER CENTER POINT.
    rectMode(CENTER)
    angleMode(RADIANS);
    createCanvas(WIDTH, HEIGHT);
    env = new Environment(0, 0, WIDTH, HEIGHT);
}

function draw() {
    background(190);
    env.draw();
}

let ballSettings = {
    denisty: 0.1,
    restitution: 1,
    friction: 0,
    frictionAir: 0,
    frictionStatic: 0,
    slop: 0
}

let playerSettings = {
    isStatic: true,
    restitution: 1,
    friction: 0,
    frictionAir: 0,
    frictionStatic: 0,
    slop: 0
}