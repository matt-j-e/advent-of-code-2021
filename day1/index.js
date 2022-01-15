const fs = require('fs');
try {
  readings = fs.readFileSync('input.txt', 'utf8').split('\n');
} catch(e) {
  console.log(e);
}

let countA = 0;
for (let i = 1; i < readings.length; i++) {
  if (parseInt(readings[i]) > parseInt(readings[i - 1])) {
    countA++;
  }
}

console.log("Part a answer =", countA);

// PART A notes
// ============
// First attempt was 1291 which was too low.
// After extracting from the input file, 'readings' is an array of STRINGS
// The > operator can produce unexpected results when comparing strings of numbers

// Convering STRINGS to NUMBERS
// the answer was 1292

let countB = 0
for (let i = 1; i < readings.length - 2; i++) {
  if (
    (
      parseInt(readings[i]) +
      parseInt(readings[i+1]) +
      parseInt(readings[i+2])
    )
    >
    (
      parseInt(readings[i-1]) +
      parseInt(readings[i]) +
      parseInt(readings[i+1])
    )
  ) {
    countB++
  }
}

console.log("Part b answer =", countB);