const fs = require('fs');
try {
  readings = fs.readFileSync('input.txt', 'utf8').split('\n');
} catch(e) {
  console.log(e);
}

let countA = 0;
let prev = readings[0];
readings.forEach((r, i) => {
  if (i !== 0 && parseInt(r) > parseInt(prev)) {
    countA++;
  }
  prev = r;
});

console.log("Part a answer =", countA);

// Had a go at reproducing the solution using an
// Array iterator method.
// Two more lines than an old fashioned for loop.