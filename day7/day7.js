const helpers = require('../helpers/helperFunctions');
const input = helpers.loadData(__dirname.split("/").pop(), 0);
const crabs = input[0].split(',').map(e => parseInt(e))

/*
// find the most common value
const freq = crabs.reduce((counts, crab) => {
  counts[crab] = ++counts[crab] || 1;
  return counts;
}, {});
let highestFreq = 0;
let mostFreqValue = -1;
Object.keys(freq).forEach(key => {
  if (freq[key] > highestFreq) {
    highestFreq = freq[key];
    mostFreqValue = parseInt(key)
  }
});
console.log(freq);
console.log(mostFreqValue);

// calculate the absolute difference between each element and it
// and sum those differences
const fuelCost = crabs.reduce((fuel, crab) => {
  return fuel += Math.abs(crab - mostFreqValue);
}, 0)

console.log("Answer a =", fuelCost);

// First attempt at 444407 was too high
// 
*/

function sumOfDeltas(arr, convergent) {
  return arr.reduce((sum, val) => sum += Math.abs(val - convergent), 0)
}

let minCost = 10000000;
const upper = Math.max(...crabs);
for (let i = 0; i < upper; i++) {
  // console.log(i, sumOfDeltas(crabs, i));
  cost = sumOfDeltas(crabs, i);
  if (cost < minCost) {
    minCost = cost;
  }
}
console.log("Answer a =", minCost);

// Answer a = 343441

function expSumOfDeltas(arr, convergent) {
  return arr.reduce((sum, val) => sum += (Math.abs(val - convergent) + 1) * Math.abs(val - convergent)  / 2, 0);
}

minCost = 100000000;
for (let i = 0; i < upper; i++) {
  cost = expSumOfDeltas(crabs, i);
  if (cost < minCost) {
    minCost = cost;
  }
}
console.log("Answer b =", minCost);

// Answer b = 98925151 (Easier to read as 98,925,151)