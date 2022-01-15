const helpers = require('../helpers/helperFunctions');
const lines = helpers.loadData(__dirname.split("/").pop(), 0);

const paper = createPaper();
populatePaper();

// verticalFold(655);
// console.log("Answer a =", paper.flat().filter(el => el === 'x').length);
// Answer a = 664
// Commented out the first fold so it doesn't impact on the second part...

folds().forEach(fold => {
  foldPoint = fold.split("=")[1];
  if (fold.split("=")[0] === "y") {
    horizontalFold(foldPoint);
  } else {
    verticalFold(foldPoint);
  }
});

/* Replace zeros with dots to make the letters stand out. */
for (let r = 0; r < paper.length; r++) {
  for (let c = 0; c < paper[0].length; c++) {
    if (paper[r][c] === 0) paper[r][c] = ' ';
  }
}

console.log("Answer b =:");
paper.forEach(r => console.log(r.join("")));

// Answer b = EFJKZLBL


function createPaper() {
  const startRows = folds(lines).find(line => line[0] === "y").split("=")[1] * 2 + 1;
  const startCols = folds(lines).find(line => line[0] === "x").split("=")[1] * 2 + 1;
  return helpers.create2DArrayOfZeros(startRows, startCols);
}

function populatePaper() {
  for (line of lines) {
    if (!isNaN(line[0])) {
      const coords = line.split(",");
      paper[coords[1]][coords[0]] = 'x';
    }
  }
}

function folds() {
  return lines.filter(line => line[0] === "f")
    .map(line => line.split(" ")[2]);
}

function horizontalFold(row) {
  for (let r = 0; r <= row; r++) {
    for (let c = 0; c < paper[0].length; c++) {
      if (paper[r][c] === "x") continue;
      if (paper[r][c] === 0 && paper[paper.length -1][c] === 'x') {
        paper[r][c] = "x"
      } else {
        continue;
      }
    }
    paper.pop();
  }
}

function verticalFold(col) {
  for (let r = 0; r < paper.length ; r++) {
    for (let c = 0; c <= col; c++) {
      const endCell = paper[r].pop();
      if (paper[r][c] === "x") {
        continue;
      }
      if (paper[r][c] === 0 && endCell === 'x') {
        paper[r][c] = "x";
      }
    }
  }
}