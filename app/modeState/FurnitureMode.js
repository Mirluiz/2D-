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
      console.log("snapping");
    } else {
      this.canvas.sofa.position = { x, y };
      this.canvas.sofa.rotation = {};
    }
  }

  getWallSnap(x, y) {
    const vec = { x, y };
    let lowestDistance = Infinity;

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
      const ln = Vector.vectorLn(wallEndOrigin);
      const projection = Vector.multiplyScalar(wallEndOrigin, vectorDot / ln);

      const rejection = Vector.sub(vecOrigin, projection);

      const distance = Vector.vectorLn(rejection);

      if (distance < lowestDistance) {
        lowestDistance = distance;
      }
      // console.log("distance", distance);
    });

    return lowestDistance < 16;
  }
}
