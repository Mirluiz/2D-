class Graph {
  nodes = [];
  edged = [];

  dfs(node, visited = {}) {
    const neighbors = this.getNeighbours(node);

    for (const neighbor of neighbors) {
      if(!visited[neighbor.uuid]) {
        this.dfs(neighbor, visited);
      }
    }
  }
  
  getNeighbours() {
    
  }
}
