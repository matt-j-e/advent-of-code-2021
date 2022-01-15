/**
 * Failed to complete the first part of today's puzzle.
 */

const helpers = require('../helpers/helperFunctions');
const lines = helpers.loadData(__dirname.split("/").pop(), 1);
const grid = lines.map(line => line.split(""));
// console.log(grid);

let flashes = 0;
let steps = 0;

while (steps < 11) {
  grid.forEach((row, r) => row.forEach((cell, c) => grid[r][c]++));
  grid.forEach((row, r) => row.forEach((cell, c) => {
    if (cell > 9) {
      incrementNeighbours(r, c);
    }
  }));
  grid.forEach((row, r) => row.forEach((cell, c) => {
    if (cell > 9) {
      flashes++;
      grid[r][c] = 0;
    }
  }));
  steps++;
  console.log(`After step ${steps}:`);
  grid.forEach(row => console.log(row.join("")));
}

// function neighbours(r, c) {
//   const maxR = grid.length - 1;
//   const maxC = grid[0].length -1;
//   const adjacents = [];
//   if (r > 0 && c > 0) adjacents.push(grid[r-1][c-1]);
//   if (r > 0) adjacents.push(grid[r-1][c]);
//   if (r > 0 && c < maxC) adjacents.push(grid[r-1][c+1]);
//   if (c > 0) adjacents.push(grid[r][c-1]);
//   if (c < maxC) adjacents.push(grid[r][c+1]);
//   if (r < maxR && c > 0) adjacents.push(grid[r+1][c-1]);
//   if (r < maxR) adjacents.push(grid[r+1][c]);
//   if (r < maxR && c < maxC) adjacents.push(grid[r+1][c+1]);

//   return adjacents;
// }

// function numberFlashingNeighbours(r, c) {
//   return neighbours(r, c).filter(n => n > 9).length
// }

function incrementNeighbours(r, c) {
  const maxR = grid.length - 1;
  const maxC = grid[0].length -1;
  if (r > 0 && c > 0) grid[r-1][c-1]++;
  if (r > 0) grid[r-1][c]++;
  if (r > 0 && c < maxC) grid[r-1][c+1]++;
  if (c > 0) grid[r][c-1]++;
  if (c < maxC) grid[r][c+1]++;
  if (r < maxR && c > 0) grid[r+1][c-1]++;
  if (r < maxR) grid[r+1][c]++;
  if (r < maxR && c < maxC) grid[r+1][c+1]++;
}

console.log(`Flashes after ${steps - 1} steps:`, flashes);