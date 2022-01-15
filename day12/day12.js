const helpers = require('../helpers/helperFunctions');
const lines = helpers.loadData(__dirname.split("/").pop(), 1);
// console.log(lines);

const adjList = buildAdjacencyList();
// console.log(adjList);

const start = "start";
const validPaths = [];
function traverse(cave, path) {
  if (!cave) {
    cave = start;
  }
  if (!path) {
    path = [];
  }
  if (cave === cave.toLowerCase()) {
    path.push(cave);
  }
  // console.log("Current path", path);
  if (cave === "end") {
    // console.log("Found valid path", path);
    validPaths.push(path);
    return;
  }
  adjList.get(cave).forEach(destination => {
    if(path.indexOf(destination) === -1) {
      const newPath = [...path];
      traverse(destination, newPath);
    }
  });
}

function buildAdjacencyList() {
  const adjList = new Map();
  lines.forEach(line => {
    const [l, r] = line.split("-");
    if (l !== "end") {
      adjList.set(l, []);
      adjList.get(l).push(r);
    }
    if (r !== "end") {
      adjList.set(r, []);
      adjList.get(r).push(l)
    }
  });
  lines.forEach(line => {
    const [l, r] = line.split("-");
    if (l !== "end" && r !== "start" && !adjList.get(l).includes(r)) {
      adjList.get(l).push(r);
    }
    if (r !== "end" && l !== "start" && !adjList.get(r).includes(l)) {
      adjList.get(r).push(l)
    }
  })
  return adjList;
}

traverse(null, null);
console.log("Answer A =", validPaths.filter(path => path.includes("end")).length);

// Answer A = 3887
