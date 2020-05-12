const WIDTH = 800;
const HEIGHT = 800;

const PlayerSpeed = 5;

//bunch of module aliases
let Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Body = Matter.Body,
    Bodies = Matter.Bodies;

let env;
let env2;

function setup() {
    frameRate(120);
    //RECTANGLES NOW DEFINED BY THIER CENTER POINT.
    rectMode(CENTER)
    angleMode(RADIANS);
    createCanvas(WIDTH, HEIGHT);
    env = new Environment(0, 0, WIDTH / 2, HEIGHT / 2);
    env2 = new Environment(WIDTH / 2, 0, WIDTH / 2, HEIGHT / 2);
}

function draw() {
    background(190);
    env.draw();
    env2.draw();
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