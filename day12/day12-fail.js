const helpers = require('../helpers/helperFunctions');
const lines = helpers.loadData(__dirname.split("/").pop(), 1);
// console.log(lines);

const adjList = buildAdjacencyList();
let visitedList = [];
const stack = [];
const routes = [];
let prevStepWasBack = false;

let availableMove = true;
let current = "start";
stack.push(current);
while (availableMove) {
  console.log("Stack =", stack);
  node = nextNode(current);
  console.log("Returned Node =", node);
  if (node) {
    stack.push(node);
    current = node;
    if (current === "end") {
      routes.push(stack);
    }
  } else {
    availableMove = false;
  }
}

console.log(routes);


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

function nextNode(currentNode) {
  if (currentNode === "end") {
    stack.pop();
    return stack[stack.length - 1];
  }
  console.log("In nextNode - currentNode =", currentNode);
  console.log("adjList[currentNode =", adjList[currentNode]);
  for (node of adjList[`${currentNode}`]) {  
    // console.log("Node =", node);
    // console.log("Stack includes node:", stack.includes(node));
    // console.log("Node is small:", nodeIsSmall(node));
    // console.log("Both", stack.includes(node) && nodeIsSmall(node));
    // console.log("Both negated:", !(stack.includes(node) && nodeIsSmall(node)));
    // console.log("Current node is small:", nodeIsSmall(currentNode));
    // console.log("Node has adjList of 1:", adjList[node].length === 1);
    // console.log("Both:", nodeIsSmall(currentNode) && adjList[node].length === 1);
    // console.log("Both negated:", !(nodeIsSmall(currentNode) && adjList[node].length === 1));
    // console.log("Node in visited list:", visitedList.includes(node));
    // console.log("Negated:", !visitedList.includes(node));
    // console.log("Combined & negated", !(stack.includes(node) && nodeIsSmall(node)) && !(nodeIsSmall(currentNode) && adjList[node].length === 1) && !visitedList.includes(node));
    if (
      !(stack.includes(node) && nodeIsSmall(node)) &&
      !(nodeIsSmall(currentNode) && adjList[node].length === 1) &&
      !visitedList.includes(node)    
    ) {
      console.log("Node to be returned:", node);
      prevStepWasBack = false;
      return node;
    }
  };
  if (stack.length > 1) {
    stack.pop();
    const next = stack[stack.length - 1];
    if (prevStepWasBack) {
      visitedList = next;
    } else {
      visitedList.push(next);
    }
    prevStepWasBack = true;
    return next;
  }
  return false;
}

function nodeIsSmall(node) {
  // console.log(node);
  if (node.charCodeAt(0) > 96) return true;
  return false;
}

// console.log(adjList);