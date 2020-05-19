/** Rename variables */
var Neat = neataptic.Neat;
var Methods = neataptic.Methods;
var Config = neataptic.Config;
var Architect = neataptic.Architect;

Config.warnings = false;

/* genetic algorithm settings */

var ITERATIONS = 1200; //how many frames per generation maximum
var MUTATION_RATE = 0.5;
var ELITISM = Math.round(0.1 * popsize);
var START_HIDDEN_SIZE = 10;

/** Global Variables */
var neat;

/*construct GA*/
function initNeat() {
    neat = new Neat(
        7, 4,
        null,
        {
            mutation: [
                Methods.Mutation.ADD_NODE,
                Methods.Mutation.SUB_NODE,
                Methods.Mutation.ADD_CONN,
                Methods.Mutation.SUB_CONN,
                Methods.Mutation.MOD_WEIGHT,
                Methods.Mutation.MOD_BIAS,
                Methods.Mutation.MOD_ACTIVATION,
                Methods.Mutation.ADD_GATE,
                Methods.Mutation.SUB_GATE,
                Methods.Mutation.ADD_SELF_CONN,
                Methods.Mutation.SUB_SELF_CONN,
                Methods.Mutation.ADD_BACK_CONN,
                Methods.Mutation.SUB_BACK_CONN
            ],
            popsize: popsize,
            mutationRate: MUTATION_RATE,
            elitism: ELITISM,
            network: new Architect.Random(7, START_HIDDEN_SIZE, 4)
        }

    );
}

function startEvaluation() {
    envs = [];  //resets ball array.
    //let x = 0;
    //let y = 0;
    //let perRow = Math.sqrt(popsize);
    //let spacing = (WIDTH / perRow);
    for (let genome in neat.population) {
        genome = neat.population[genome];
        envs.push(new Environment(0, 0, width, width, genome));
        //x += spacing;
        //if (x == WIDTH) {
        // x = 0;
        // y += spacing;
        // }
    }

    //console.log(envs); 
    neat.mutate();
}


function endEvaluation() {
    console.log('Generation: ', neat.generation, ' - average score: ', neat.getAverage());
    console.log('Generation highest score', neat.getFittest().score);

    genBest.push(neat.getFittest());
    console.log(neat.getFittest());

    //CLEANUP
    envs.forEach(env => {
        env.engine.events = {};
        World.clear(env.engine.world);
        Engine.clear(env.engine);
    });

    // console.log('Generation: ', neat.generation);
    // console.log('Generation highest score', neat.getFittest().score);

    //networks shouldn't get too big
    for (var genome in neat.population) {
        genome = neat.population[genome];
        genome.score -= (genome.nodes.length);
    }

    neat.sort();
    var newPopulation = [];

    //Elitism
    for (var i = 0; i < neat.elitism; i++) {
        newPopulation.push(neat.population[i]);
    }

    //breed next population
    for (var i = 0; i < neat.popsize - neat.elitism; i++) {
        newPopulation.push(neat.getOffspring());
    }

    //replace old pop with new
    neat.population = newPopulation;
    neat.mutate();

    neat.generation++;
    startEvaluation();

    startDrawing(genBest[neat.generation - 1]);
}