const WIDTH = 800;//SQUARE
const HEIGHT = 800;

const PlayerSpeed = 10;
const PlayerWidth = 0.3; //out of 1, how much of width of the env is taken up by the player 

const winWallWidth = 30;

const popsize = 30; //root of this needs to be something that WIDTH or HEIGHT is divisble by

let drawing;

let activeTimeSteps = 500; // if inactive for this many time steps, youre dead.

//bunch of module aliases
let Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Body = Matter.Body,
    Bodies = Matter.Bodies,
    Events = Matter.Events;

let envs = [];

let genBest = [];// array of every generation's best creature.

function setup() {
    frameRate(35);
    //RECTANGLES NOW DEFINED BY THIER CENTER POINT.
    rectMode(CENTER)
    angleMode(RADIANS);
    createCanvas(WIDTH, HEIGHT);

    initNeat();
    startEvaluation();
}

function draw() {
    background(190);

    for (let i = 0; i < 1; i++) {
        timeStep();
    }
}

function timeStep() {

    //we want to draw the last generation's best
    if (neat.generation == 0) {
        console.log("no previous best");
        drawing = NaN;
    } else {
        textSize(30);
        fill(50);
        strokeWeight(2);
        stroke(0);
        text(`Showing: Best creature of generation ${neat.generation - 1}`, 50, 50);
        drawing.draw();
        drawing.update();
        drawing.checkDeath();
    }



    for (let i = 0; i < envs.length; i++) {
        envs[i].update();
        //envs[i].draw();
        envs[i].checkDeath();
    }

    alldead = true;
    envs.forEach(env => {
        if (env.player.alive == true) alldead = false;
    });
    if (alldead) endEvaluation();
}

let ballSettings = {
    denisty: 1,
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

let wallSettings = {
    isStatic: true,
    restitution: 1,
    friction: 0,
    frictionAir: 0,
    frictionStatic: 0,
    slop: 0
}

function startDrawing(genome) {
    drawing = new Environment(0, 0, WIDTH, HEIGHT, genome);
}