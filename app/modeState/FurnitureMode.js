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

      const origin = {
        x: wall.start.x - wall.end.x,
        y: wall.start.y - wall.end.y,
      };

      const angle = Math.atan2(origin.y, origin.x);

      const offset = {
        x: 0,
        y: this.canvas.sofa?.dimension?.height / 2,
      };

      this.canvas.sofa.position = {
        ...Vector.add(position, Vector.rotate(offset, angle + Math.PI)),
      };

      this.canvas.sofa.rotation = angle + Math.PI;
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

      // const t = posToOrigin.dot(toOrigin) / toOrigin.lengthSq();
      const t =
        Vector.dot(vecOrigin, wallEndOrigin) /
        Vector.squaredLength(wallEndOrigin);

      if (
        distance < lowestDistance &&
        t >= 0 &&
        t <= 1 &&
        Vector.vectorLn(projection) < Vector.vectorLn(wallEndOrigin)
      ) {
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
