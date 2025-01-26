class Graph {
  nodes = [];
  edges = {};

  dfs(node, visited = {}) {
    const neighbors = this.getNeighbours(node);

    for (const neighbor of neighbors) {
      if (!visited[neighbor.uuid]) {
        this.dfs(neighbor, visited);
      }
    }
  }

  getNeighbours(node) {
    return this.edges[node.uuid];
  }

  update(walls, corners) {
    corners.forEach((corner) => {
      this.addNode(corner);

      walls.forEach((wall) => {
        const isStart = wall.startConnection.uuid === corner.uuid;
        const isEnd = wall.endConnection.uuid === corner.uuid;

        if (isStart) {
          const neighborCorner = corners.find(
            (c) => c.uuid === wall.startConnection.uuid
          );

          if (neighborCorner) this.addEdge(corner, neighborCorner);
        } else if (isEnd) {
          const neighborCorner = corners.find(
            (c) => c.uuid === wall.endConnection.uuid
          );

          if (neighborCorner) this.addEdge(corner, neighborCorner);
        }
      });
    });
  }

  addNode(n) {
    this.nodes.push(n);
  }

  addEdge(vertex, adjusted) {
    if (!this.edges[vertex.uuid]) {
      this.edges[vertex.uuid] = [];
    }

    this.edges[vertex.uuid].push(adjusted);
  }

  hasCycle() {
    return false;
  }
}
