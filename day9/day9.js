const helpers = require('../helpers/helperFunctions');
const lines = helpers.loadData(__dirname.split("/").pop(), 0);
const hm = lines.map(line => line.split("").map(el => parseInt(el))); // hm for heightmap
const rows = hm.length;
const cols = hm[0].length;
// console.log(hm);

function findAdjacentCells(r, c) {
  const cells = [
    [r - 1, c],
    [r, c - 1], [r, c + 1],
    [r + 1, c]
  ];
  for (let i = cells.length - 1; i >= 0; i--) {
    const maxr = rows - 1;
    const maxc = cols - 1
    if (cells[i][0] < 0 || cells[i][1] < 0 || cells[i][0] > maxr || cells[i][1] > maxc) cells.splice(i, 1);
  }
  return cells;
}

function adjacentValues(r, c) {
  const cells = findAdjacentCells(r, c)
  const values = [];
  cells.forEach(cell => {
    values.push(hm[cell[0]][cell[1]]);
  });
  return values;
}

/***************************************************
*** THIS WORKS FINE. I REFACTORED IT BELOW USING ***
*** ARRAY ITERATORS JUST TO TRY IT OUT           ***
****************************************************
let sum = 0;
for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    if (hm[r][c] < Math.min(...adjacentValues(r, c))) {
      sum += (hm[r][c] + 1)
    }
  }
}
console.log("Answer a =", sum);
*/

let sum = 0;
hm.forEach((row, r) => row.forEach((cell, c) => {
  if (cell < Math.min(...adjacentValues(r, c))) {
    sum += cell + 1;
  }
}));

console.log("Answer a =", sum);

// Answer a = 554
