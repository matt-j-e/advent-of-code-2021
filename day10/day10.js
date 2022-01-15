const helpers = require('../helpers/helperFunctions');
const lines = helpers.loadData(__dirname.split("/").pop(), 0);

const illegals = {
  r: 0,
  s: 0,
  c: 0,
  a: 0
}

function saveIllegal(char) {
  if (char === ")") illegals.r++;
  if (char === "]") illegals.s++;
  if (char === "}") illegals.c++;
  if (char === ">") illegals.a++;
  return;
}

function isMatcherFor(closer, stackChar) {
  if (stackChar === "(" && closer === ")") return true;
  if (stackChar === "[" && closer === "]") return true;
  if (stackChar === "{" && closer === "}") return true;
  if (stackChar === "<" && closer === ">") return true;
  return false;
}

const closers = [")", "]", "}", ">"];

const corruptLines = [];
let lineNumber = 0
for (line of lines) {
  const stack = [];
  for (c of line) {
    if (closers.includes(c)) {
      if (!isMatcherFor(c, stack[stack.length - 1])) {
        saveIllegal(c);
        corruptLines.push(lineNumber);
        break;
      } else {
        stack.pop();
      }
    } else {
      stack.push(c);
    }
  }
  lineNumber++
}

const score = (illegals.r * 3) + (illegals.s * 57) + (illegals.c * 1197) + (illegals.a * 25137);
console.log("Answer a =", score);

// Answer a = 413733

for (let i = corruptLines.length - 1; i >= 0; i--) {
  lines.splice(corruptLines[i], 1);
}

const scores = [];

function getValue(b) {
  if (b === "(") return 1;
  if (b === "[") return 2;
  if (b === "{") return 3;
  if (b === "<") return 4;
}

function calculateScore(arr) {
  let score = 0;
  while (arr.length > 0) {
    score *= 5;
    score += getValue(arr.pop())
  }
  scores.push(score);
}

for (line of lines) {
  const stack = [];
  for (c of line) {
    if (closers.includes(c)) {
       stack.pop();
    } else {
      stack.push(c);
    }
  }
  calculateScore(stack);
  lineNumber++
}

console.log("Answer b =", scores.sort((a,b) => a - b)[Math.floor(scores.length / 2)]);

// Answer b = 3354640192 (or 3,354,640,192)