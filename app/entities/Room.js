class Room extends Object2D {
  corners = [];

  draw(ctx) {
    ctx.beginPath();

    ctx.moveTo(this.corners[0].position.x, this.corners[0].position.y);

    this.corners?.forEach((corner) => {
      ctx.lineTo(corner.position.x, corner.position.y);
    });

    ctx.closePath();
    ctx.fillStyle = "#d3d3d3";
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.stroke();
  }
}
