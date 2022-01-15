const helpers = require('../helpers/helperFunctions');
let test = 0;
const lines = helpers.loadData(__dirname.split("/").pop(), test);
// console.log("__dirname", __dirname.split("/").pop());

// create 2-d array of 0's
let dimension;
test === 1 ? dimension = 10 : dimension = 1000;
const seaBed = helpers.create2DArrayOfZeros(dimension, dimension);

// determine if diagonal & ignore
// convert to list of points
// increment each point by 1
lines.forEach(line => {
  line = line.split(" -> ");
  if (
    line[0].split(",")[0] === line[1].split(",")[0] || 
    line[0].split(",")[1] === line[1].split(",")[1])
    {
      const rStart = Math.min(line[0].split(",")[1], line[1].split(",")[1]);
      const rEnd = Math.max(line[0].split(",")[1], line[1].split(",")[1]) + 1;
      const cStart = Math.min(line[0].split(",")[0], line[1].split(",")[0]);
      const cEnd = Math.max(line[0].split(",")[0], line[1].split(",")[0]) + 1;
      for (let i = rStart; i < rEnd; i++) {
        for (let j = cStart; j < cEnd; j++) {
          seaBed[i][j]++;
        }
      }
    }
});

console.log("Answer a =", seaBed.flat().filter(n => n > 1).length);

// Answer a = 6687

function swapCoords(line) {
  if (line[0].split(",")[1] > line[1].split(",")[1]) {
    return [ line[1], line[0] ]
  }
  return line;
}

lines.forEach(line => {
  line = line.split(" -> ");
  if (
    line[0].split(",")[0] !== line[1].split(",")[0] && 
    line[0].split(",")[1] !== line[1].split(",")[1])
    {
      // console.log(line);
      line = swapCoords(line);
      const rStart = line[0].split(",")[1];
      const rEnd = parseInt(line[1].split(",")[1]) + 1;
      let col = parseInt(line[0].split(",")[0]);
      const colsAscending = line[0].split(",")[0] < line[1].split(",")[0];
      let colsIncrement = colsAscending ? 1 : -1;
      for (let i = rStart; i < rEnd; i++) {
        seaBed[i][col]++;
        col += colsIncrement;
      }

    } 
});

// seaBed.map(row => console.log(row));
// console.log("Answer b =", seaBed.flat().filter(n => n > 1).length);

// Answer b attempted 19113 (too low)