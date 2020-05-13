const WIDTH = 800;//SQUARE
const HEIGHT = 800;

const PlayerSpeed = 5;
const PlayerWidth = 0.3; //out of 1, how much of width of the env is taken up by the player 

const winWallWidth = 4;

const popsize = 64; //root of this needs to be something that WIDTH or HEIGHT is divisble by

//bunch of module aliases
let Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Body = Matter.Body,
    Bodies = Matter.Bodies;

let envs = [];


function setup() {
    frameRate(120);
    //RECTANGLES NOW DEFINED BY THIER CENTER POINT.
    rectMode(CENTER)
    angleMode(RADIANS);
    createCanvas(WIDTH, HEIGHT);

    let x = 0;
    let y = 0;
    let perRow = Math.sqrt(popsize);
    let spacing = (WIDTH / perRow);
    for (let i = 0; i < popsize; i++) {
        envs.push(new Environment(x, y, spacing, spacing));
        x += spacing;
        if (x == WIDTH) {
            x = 0;
            y += spacing;
        }
    }

    console.log(envs);
}

function draw() {
    background(190);
    for (let i = 0; i < envs.length; i++) {
        envs[i].update();
        envs[i].draw();
        envs[i].checkDeath();
    }
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