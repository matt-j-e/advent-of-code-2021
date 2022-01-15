const helpers = require('../helpers/helperFunctions');
const lines = helpers.loadData(__dirname.split("/").pop(), 1);
// console.log(lines);

const adjList = buildAdjacencyList();

function buildAdjacencyList() {
  const adjList = {};
  lines.forEach(line => {
    const l = line.split("-")[0];
    const r = line.split("-")[1];
    !adjList[l] ? adjList[l] = [r] : adjList[l].push(r);
    !adjList[r] ? adjList[r] = [l] : adjList[r].push(l);
  });
  return adjList;
}

function isSmall(node) {
  if (node.charCodeAt(0) > 96) return true;
  return false;
}

function bfs(start) {
  const route = [];
  const visited = new Set();
  const queue = [ start ];
  visited.add(start);

  while (queue.length > 0) {
    const cave = queue.shift();
    route.push(cave);
    const destinations = adjList[cave] ;
    for (const destination of destinations) {
      if (destination === "end") {
        console.log("Found End", route);
      }
      if (!visited.has(destination)) {
        if (isSmall(destination)) {
          visited.add(destination);
        }
        queue.push(destination);
      }
    }
    console.log("visited", visited);
  }
}

bfs("start");