let filename = "input.txt";
let test = 0
if (test) {
  filename = "test.txt";
}
const fs = require('fs');
try {
  commands = fs.readFileSync(filename, 'utf8').split('\n');
} catch(e) {
  console.log(e);
}

const pos = {
  h: 0,
  d: 0
};

commands.forEach(c => {
  const dist = parseInt(c[c.length - 1]);
  if (c[0] === "f") {
    pos.h += dist;
  } else if (c[0] === "d") {
    pos.d += dist;
  } else {
    pos.d -= dist;
  }
});

console.log("Answer a =", pos.h * pos.d);

// Answer a = 2027977

let aim = 0;
pos.h = 0;
pos.d = 0;
commands.forEach(c => {
  const dist = parseInt(c[c.length - 1]);
  if (c[0] === "f") {
    pos.h += dist;
    pos.d += (dist * aim);
  } else if (c[0] === "d") {
    aim += dist;
  } else {
    aim -= dist;
  }
});

console.log("Answer b =", pos.h * pos.d);

// Answer b = 1903644897