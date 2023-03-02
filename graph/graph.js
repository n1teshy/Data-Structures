// Note: Don't assign Number.MAX_VALUE as any edge'c cost
// Note: further improvement in shortestPath() is required

const MinHeap = require("../trees/minHeap");

class Graph {
  constructor() {
    this.graph = {};
  }

  addNode(source) {
    this.graph[source] = {};
  }

  addPath(source, destination, distance = 1) {
    if (source === destination) {
      return;
    }
    if (this.graph[source] === undefined) {
      this.addNode(source);
    }
    if (this.graph[destination] === undefined) {
      this.addNode(destination);
    }
    this.graph[source][destination] = distance;
  }

  removeNode(source) {
    delete this.graph[source];
    for (let key in this.graph) {
      delete this.graph[key][source];
    }
  }

  removePath(source, destination) {
    if (this.graph[source] === undefined) {
      return;
    }
    delete this.graph[source][destination];
  }

  shortestPath(source, destination) {
    const distances = { [source]: 0 };
    const relaxed = {};
    // shortestPath will store the nearest node to source for every node in the graph
    // it would be used to determine the actual path any-given-node -> source
    const shortestPath = {};
    const distanceHeap = new MinHeap();

    for (let node in this.graph) {
      // TODO: Find a way to use Infinity instead of Number.MAX_VALUE
      distances[node] = this.graph[source][node]
        ? this.graph[source][node]
        : Number.MAX_VALUE;
      distanceHeap.insert(distances[node], node);
    }
    let currentNode = distanceHeap.pop();
    if (currentNode !== null) {
      shortestPath[currentNode.data] = source;
    }
    while (currentNode !== null && relaxed[destination] === undefined) {
      if (relaxed[currentNode.data] === undefined) {
        const currentDistance = currentNode.key;
        relaxed[currentNode.data] = currentDistance;
        for (let node in this.graph[currentNode.data]) {
          shortestPath[node] = currentNode.data;
          if (
            distances[node] >
            currentDistance + this.graph[currentNode.data][node]
          ) {
            distances[node] =
              currentDistance + this.graph[currentNode.data][node];
            distanceHeap.insert(distances[node], node);
          }
        }
      }
      currentNode = distanceHeap.pop();
    }
    const path = [];
    let start = destination;
    while (start !== undefined) {
      if (Number(start) === source) {
        break;
      } else {
        path.push(start);
        start = shortestPath[start];
      }
    }
    return [
      path.reverse(),
      relaxed[destination] === undefined ||
      relaxed[destination] === Number.MAX_VALUE
        ? Infinity
        : relaxed[destination],
    ];
  }
}

const graph = new Graph();
graph.addPath(3, 6);
graph.addPath(6, 4);
console.log(graph.shortestPath(3, 4));
