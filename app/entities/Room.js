class Room extends Object2D {
  corners = [];

  draw() {
    ctx.beginPath();

    ctx.moveTo(this.corners[0].x, this.corners[0].y);

    this.corners.forEach((corner) => {
      ctx.lineTo(corner.x, corner.end.y);
    });

    ctx.closePath();
    ctx.fillStyle = "rgba(100, 150, 250, 0.5)";
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.stroke();
  }
}
