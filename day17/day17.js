/* Simple input today. No need to parse it */
const loc = {
  x: 0,
  y: 0
}

let target = { //test
  tl: {x: 20, y: -5},
  br: {x: 30, y: -10}
}

target = { //input
  tl: {x: 253, y: -46},
  br: {x: 280, y: -73}
}

let v = {
  x: 1,
  y: 20
}

let heights = [];
let hits = 0;
for (let x = 0; x < target.br.x; x++) {
  for (let y = target.br.y - 10; y < 100; y++) {
    // console.log(x, ",", y);
    plotTrajectory(
      {x: 0, y: 0},
      {x: x, y: y}
    )
  }
}

console.log("Answer A =", Math.max(...heights));

// 190 too low
// Answer A = 2628

console.log("Answer B =", hits);

// Answer B = 1334

// 1332 too low
// 1333 too low
// 1348 was wrong (no hints after 4 guesses)
// 1359 was wrong
// 1360 too high


function adjustVx(vx) {
  if (vx === 0) return vx;
  return vx < 0 ? vx + 1 : vx - 1;
}

function plotTrajectory(loc, v, height=0) {
  if (loc.x > target.br.x || loc.y < target.br.y) {
    // console.log("Miss");
    return loc;
  }
  if (loc.y > height) {
    height = loc.y;
  }
  // console.log(loc);
  if (inTarget(loc)) {
    // console.log("Hit!", loc, height);
    heights.push(height);
    hits++;
  }
  // inTarget(loc) ? console.log("Hit!", loc) : console.log(loc);
  loc.x += v.x;
  loc.y += v.y;
  v.x = adjustVx(v.x);
  v.y--;
  plotTrajectory(loc, v, height);
}

function inTarget(loc) {
  return loc.x >= target.tl.x &&
          loc.x <= target.br.x &&
          loc.y <= target.tl.y &&
          loc.y >= target.br.y
}

// console.log(target);
// console.log("Adj vx 7", adjustVx(0));

// console.log(plotTrajectory({x: 0, y: 0}, {x: 6, y: 9}));