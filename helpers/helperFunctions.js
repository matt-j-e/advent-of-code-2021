/**
 * Create a 2d array with the defined number of rows & cols
 * @param {*} rows The number of rows in the array
 * @param {*} cols The number of columns in the array
 * @returns the completed array
 */
function create2DArrayOfZeros(rows, cols) {
  const arr = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      row.push(0)
    }
    arr.push(row);
  }
  return arr;
}

/**
 * Load the puzzle input into a starting array
 * @param {*} dir The current day's directory
 * @param {*} test  A flag to control whether the test input or
 * actual input is loading into the initial array.
 * @returns the puzzle input contained in an array
 */
function loadData(dir, test=false) {
  const fs = require('fs');

  let filename = `../${dir}/input.txt`;
  if (test) {
    filename = `../${dir}/test.txt`;
  }
  try {
    return fs.readFileSync(filename, 'utf8').split('\n');
  } catch(e) {
    console.log(e);
  }
  
}

module.exports = {
  create2DArrayOfZeros,
  loadData
}