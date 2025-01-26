class WallMode extends Mode {
  canvas;
  active;

  constructor(canvas) {
    super();

    this.canvas = canvas;
  }

  onClick(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const snap = this.checkForSnap(x, y);
    const newWall = new Wall();

    if (this.active) {
      if (snap && snap.connection)
        this.active.end.connections.push(snap.connection);
      this.active = null;
    }

    if (snap) {
      newWall.start = { x: snap.x, y: snap.y };
      // newWall.start.connections = [snap.connection];
      newWall.end = { x: snap.x, y: snap.y };
    } else {
      newWall.start = { x, y };
      newWall.end = { x, y };
    }

    this.active = newWall;
    this.canvas.walls.push(newWall);

    const isRoomCreated = this.checkForRoom();
  }

  onMove(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (this.active) {
      const snap = this.checkForSnap(x, y);
      if (snap) {
        this.active.end = { x: snap.x, y: snap.y };
      } else {
        this.active.end = { x, y };
      }
    }
  }

  onKeyDown(event) {
    if (event.code === "Escape") {
      this.active = null;
    }
  }

  checkForSnap(x, y) {
    let ret = null;
    const vec = { x, y };

    this.canvas.walls.forEach((wall) => {
      if (wall.uuid === this.active?.uuid || ret) {
        return;
      }

      const distanceToStart = Vector.distance(wall.start, vec);
      const distanceToEnd = Vector.distance(wall.end, vec);

      if (distanceToStart < 16) {
        ret = {
          x: wall.start.x,
          y: wall.start.y,
          connection: wall.start,
        };
      } else if (distanceToEnd < 16) {
        ret = {
          x: wall.end.x,
          y: wall.end.y,
          connection: wall.end,
        };
      } else {
        if (Math.abs(wall.start.x - x) < 8) {
          ret = { x: wall.start.x, y };
        }

        if (Math.abs(wall.start.y - y) < 8) {
          ret = { x, y: wall.start.y };
        }

        if (Math.abs(wall.end.x - x) < 8) {
          ret = { x: wall.end.x, y };
        }

        if (Math.abs(wall.end.y - y) < 8) {
          ret = { x, y: wall.end.y };
        }
      }
    });

    return ret;
  }

  checkForRoom() {
    let startVisited = 0;

    const dfs = (vertex, visitedEnds = {}) => {
      visitedEnds[vertex.uuid] = true;

      const neighbors = [];

      vertex.connections?.forEach((connection) => {
        const oppositeEnd = connection.getOpposite();

        if (oppositeEnd) {
          neighbors.push(oppositeEnd);
        }
      });

      for (const neighbor of neighbors) {
        if (!visited[neighbor.uuid]) {
          this.dfs(neighbor, visited);
        }
      }
    };

    const startPos = this.canvas.walls[0];
    const res = dfs(startPos);
    if (res) dfs(this.canvas.walls[0].end);
  }
}
