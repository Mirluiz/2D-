class Graph {
  nodes = []; // Corner[]
  edges = {}; // [key in string: Corner]

  dfs(node, visited = {}, start) {
    const neighbors = this.getNeighbours(node);
    visited[node.uuid] = true;

    for (const neighbor of neighbors) {
      if (!visited[neighbor.uuid]) {
        if (this.dfs(neighbor, visited, node)) {
          return true;
        }
      } else if (start.uuid !== neighbor.uuid) {
        return true;
      }
    }

    return false;
  }

  getNeighbours(node) {
    return this.edges[node.uuid] ?? [];
  }

  update(walls, corners) {
    this.nodes = [];
    this.edges = {};

    corners?.forEach((corner) => {
      this.addNode(corner);

      walls?.forEach((wall) => {
        const isStart = wall.startConnection?.uuid === corner.uuid;
        const isEnd = wall.endConnection?.uuid === corner.uuid;

        if (isStart) {
          const neighborCorner = corners.find(
            (c) => c.uuid === wall.endConnection?.uuid
          );

          if (neighborCorner) this.addEdge(corner, neighborCorner);
        } else if (isEnd) {
          const neighborCorner = corners.find(
            (c) => c.uuid === wall.startConnection?.uuid
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

  getCycle(corners) {
    if (corners.length === 0) {
      return false;
    }

    const visited = {};
    const hasCycle = this.dfs(corners[0], visited, corners[0]);

    if (hasCycle) {
      return Object.keys(visited);
    } else {
      return false;
    }
  }
}
