const helpers = require('../helpers/helperFunctions');
const input = helpers.loadData("day6", 0);

let population = input[0].split(",").map(f => parseInt(f));
let day = 0;
let births = 0;
while (day < 80) {
  for (let i = 0; i < population.length; i++) {
    if (population[i] === 0) {
      population[i] = 6;
      births++
    } else {
      population[i] = population[i] - 1;
    }
  }
  for (let i = 0; i < births; i++) {
    population.push(8);
  }
  births = 0;
  // console.log(`After ${day + 1} day(s)`, population.length);
  day++;
}

console.log("Answer a =", population.length);

// Answer a = 352872

// Part two of this question runs on to 256 days.
// Using the method above leads to a "heap out of memory" error, as expected.
// Need to optimise!
// This is where my knowledge is lacking