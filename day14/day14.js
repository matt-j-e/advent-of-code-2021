const helpers = require('../helpers/helperFunctions');
const lines = helpers.loadData(__dirname.split("/").pop(), 1);
const polymer = lines[0].split("");

const pir = {}; // pir stands for "pair insertion rules"
lines.filter(l => l[3] === "-").forEach(el => {
  const k = el[0]+el[1];
  const v = el[6];
  pir[k] = v;
});


let step = 0;
let stop = 10;
p = [...polymer];
while (step < stop) {
  const iterations = p.length - 1;
  for (let i = 0; i < iterations; i++) {
    const pos = i * 2
    const k = p[pos]+p[pos + 1];
    p.splice(pos + 1, 0, pir[k]);
  }
  step++;
}

const letters = new Set(Object.values(pir))
let counts = [];
letters.forEach(l => counts.push(p.filter(e => e === l).length));
console.log("Answer A =", Math.max(...counts) - Math.min(...counts));

// Answer a = 3411

/**
 * Part two can't be iterated over: it's just too big a problem.
 * The while loop below takes literally hours to run through.
 * There must be an algorithmic way to solve it.
 */

step = 0;
stop = 40;
p = [...polymer];
while (step < stop) {
  const iterations = p.length - 1;
  console.log(iterations);
  for (let i = 0; i < iterations; i++) {
    const pos = i * 2
    const k = p[pos]+p[pos + 1];
    p.splice(pos + 1, 0, pir[k]);
  }
  step++;
}

counts = [];
letters.forEach(l => counts.push(p.filter(e => e === l).length));
console.log("Answer B =", Math.max(...counts) - Math.min(...counts));