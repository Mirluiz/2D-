class Wall extends Object2D {
  isWall = true;
  fillColor = "green";

  start = { x: 0, y: 0 };
  end = { x: 0, y: 0 };
  endDimension = { width: 10, depth: 10 };
  startConnection = null;
  endConnection = null;

  draw(ctx) {
    const angle = this.getWallAngle();
    this.start.angle = angle;
    this.end.angle = angle;

    this.drawLine(ctx);
    this.drawEnd(ctx, "start");
    this.drawEnd(ctx, "end");
  }

  drawLine(ctx) {
    const { start, end } = this;

    ctx.beginPath();

    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);

    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.closePath();
  }

  drawEnd(ctx, end) {
    ctx.save();

    ctx.fillStyle = this.fillColor;

    const { x: leftUpX, y: leftUpY } = this[end];
    const { width, depth } = this.endDimension;
    const x = leftUpX - width / 2;
    const y = leftUpY - depth / 2;

    ctx.fillRect(x, y, width, depth);
    ctx.restore();
  }

  getWallAngle() {
    const { start, end } = this;
    const origin = {
      x: end.x - start.x,
      y: end.y - start.y,
    };

    return Math.atan2(origin.y, origin.x);
  }
}
