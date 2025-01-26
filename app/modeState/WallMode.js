class WallMode extends Mode {
  canvas;
  active;
  graph = new Graph();

  constructor(canvas) {
    super();

    this.canvas = canvas;
  }

  onClick(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    let snap = this.checkForSnap(x, y);
    const newWall = new Wall();

    if (this.active) {
      if (snap && snap.connection) {
        console.log(
          "snap.connection instanceof Corner",
          snap.connection instanceof Corner,
          snap.connection
        );
        if (snap.connection instanceof Corner) {
          this.active.endConnection = snap.connection;
        } else {
          if (snap.connection) {
            this.connectWalls(snap.connection, this.active, snap.end, "end");
          }
        }
      }

      this.active = null;
    }

    snap = this.checkForSnap(x, y);

    if (snap) {
      newWall.start = { x: snap.x, y: snap.y };

      if (snap.connection instanceof Corner) {
        newWall.startConnection = snap.connection;
      } else if (snap.connection) {
        this.connectWalls(snap.connection, newWall, snap.end, "start");
      }

      newWall.end = { x: snap.x, y: snap.y };
    } else {
      newWall.start = { x, y };
      newWall.end = { x, y };
    }

    this.active = newWall;
    this.canvas.walls.push(newWall);

    const room = this.checkForRoom();

    if (room) {
      const newRoom = new Room();
      room.forEach((cornerUUID) => {
        const corner = this.canvas.corners.find((c) => c.uuid === cornerUUID);
        if (corner) newRoom.corners.push(corner);
        // console.log("new room", newRoom);
        this.canvas.rooms.push(newRoom);
      });
    }
  }

  onMove(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (this.active) {
      const snap = this.checkForSnap(x, y);
      if (snap) {
        this.active.end = { x: snap.x, y: snap.y };
        this.active.endConnection = snap.connection;
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

    this.canvas.corners.forEach((corner) => {
      const distanceToCorner = Vector.distance(corner.position, vec);

      if (distanceToCorner < 16) {
        ret = {
          x: corner.position.x,
          y: corner.position.y,
          connection: corner,
        };
      }
    });

    if (ret) {
      return ret;
    }

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
          connection: wall,
          end: "start",
        };
      } else if (distanceToEnd < 16) {
        ret = {
          x: wall.end.x,
          y: wall.end.y,
          connection: wall,
          end: "end",
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
    this.graph.update(this.canvas.walls, this.canvas.corners);
    const cycle = this.graph.getCycle(this.canvas.corners);

    return cycle;
  }

  connectWalls(wall, wall1, end, end1) {
    const corner = new Corner();

    corner.position = { ...wall[end] };

    if (end === "end") {
      wall.endConnection = corner;
    } else {
      wall.startConnection = corner;
    }

    if (end1 === "end") {
      wall1.endConnection = corner;
    } else {
      wall1.startConnection = corner;
    }

    this.canvas.corners.push(corner);
  }
}
