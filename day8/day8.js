const helpers = require('../helpers/helperFunctions');
const lines = helpers.loadData(__dirname.split("/").pop(), 0);

let count = 0;
lines.forEach(line => line.split(" | ")[1]
  .split(" ")
  .forEach(chunk => {
    if (
      chunk.length === 2 ||
      chunk.length === 3 ||
      chunk.length === 4 ||
      chunk.length === 7
      ) {
        count++
      }
  })
)
console.log("Answer a =", count);

// Answer a = 412


function decode(txt) {
  const digits = [];
  digits[1] = txt.filter(chunk => chunk.length === 2)[0].split("");
  digits[7] = txt.filter(chunk => chunk.length === 3)[0].split("");
  digits[4] = txt.filter(chunk => chunk.length === 4)[0].split("");
  digits[8] = txt.filter(chunk => chunk.length === 7)[0].split("");
  digits[3] = txt
    .filter(chunk => chunk.length === 5)
    .filter(chunk => digits[1].every(elem => chunk.split("").includes(elem)))[0].split("");
  digits[9] = txt
    .filter(chunk => chunk.length === 6)
    .filter(chunk => digits[4].every(elem => chunk.split("").includes(elem)))[0].split("");
  digits[0] = txt
    .filter(chunk => chunk.length === 6)
    .filter(chunk => digits[1].every(elem => chunk.split("").includes(elem)))
    .filter(chunk => chunk !== digits[9].join(""))[0].split("");
  digits[6] = txt
    .filter(chunk => chunk.length === 6)
    .filter(chunk => chunk !== digits[0].join(""))
    .filter(chunk => chunk !== digits[9].join(""))[0].split("");
  digits[5] = txt
    .filter(chunk => chunk.length === 5)
    .filter(chunk => chunk.split("").every(elem => digits[6].includes(elem)))[0].split("");
  digits[2] = txt
  .filter(chunk => chunk.length === 5)
  .filter(chunk => chunk !== digits[5].join(""))
  .filter(chunk => chunk !== digits[3].join(""))[0].split("");

  return digits;
}

count = 0;
lines.forEach(line => {
  const digits = decode(line.split(" | ")[0].split(" "));
  let number = '';
  line.split(" | ")[1].split(" ").forEach(code => {
    number += digits.findIndex(digit => digit.sort().join("") === code.split("").sort().join(""));
  });
  count += parseInt(number);
});

console.log("Answer b = ", count);

// Answer b = 978171 