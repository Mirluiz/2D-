class Wall extends Object2D {
  isWall = true;
  fillColor = 'green';

  start = new WallEnd()
  end = new WallEnd()

  draw(ctx) {
    const angle = this.getWallAngle()
    this.start.angle = angle;
    this.end.angle = angle;

    this.drawLine(ctx)
    this.start.draw(ctx)
    this.end.draw(ctx)
  }

  drawLine(ctx) {
    const start = this.start.position;
    const end = this.end.position;
    ctx.beginPath();
    
    ctx.moveTo(start.x, start.y);  
    ctx.lineTo(end.x, end.y);

    ctx.strokeStyle = 'black'; 
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.closePath();
  }

 
  getWallAngle() {
    const { start, end } = this;
    const origin = {
      x: end.position.x - start.position.x,
      y: end.position.y - start.position.y,
    };

    return Math.atan2(origin.y, origin.x);
  }
}