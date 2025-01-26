class FurnitureMode extends Mode {
  canvas;
  active;

  constructor(canvas, graph) {
    super();

    this.canvas = canvas;
    this.graph = graph;
  }

  onMove(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const wallSnap = this.getWallSnap(x, y);

    if (wallSnap) {
      const { position, wall } = wallSnap;
      this.canvas.sofa.position = { ...position };
      const origin = {
        x: wall.start.x - wall.end.x,
        y: wall.start.y - wall.end.y,
      };

      const angle = Math.atan2(origin.y, origin.x);
      this.canvas.sofa.rotation = angle;
    } else {
      this.canvas.sofa.position = { x, y };
      this.canvas.sofa.rotation = 0;
    }
  }

  getWallSnap(x, y) {
    const vec = { x, y };
    let lowestDistance = Infinity;
    let pos = { x, y };
    let _wall = null;

    this.canvas.walls.forEach((wall) => {
      const wallEndOrigin = {
        x: wall.end.x - wall.start.x,
        y: wall.end.y - wall.start.y,
      };
      const vecOrigin = {
        x: vec.x - wall.start.x,
        y: vec.y - wall.start.y,
      };

      const vectorDot = Vector.dot(vecOrigin, wallEndOrigin);
      const ln = Vector.squaredLength(wallEndOrigin);

      const projection = Vector.multiplyScalar(wallEndOrigin, vectorDot / ln);
      const rejection = Vector.sub(vecOrigin, projection);
      const distance = Vector.vectorLn(rejection);

      if (distance < lowestDistance) {
        lowestDistance = distance;
        pos = { ...Vector.add(projection, wall.start) };
        _wall = wall;
      }
    });

    return lowestDistance < 16 ? { position: pos, wall: _wall } : null;
  }

  drawCircle(x, y) {
    const ctx = this.canvas.ctx;
    console.log(x, y);
    const centerX = x;
    const centerY = y;
    const radius = 15;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = "purple";
    ctx.fill();
    ctx.stroke();
  }
}
