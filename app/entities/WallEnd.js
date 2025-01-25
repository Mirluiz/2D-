class WallEnd extends Object2D {
  fillColor = 'green'

  connection // Object2D

  draw(ctx) {
    ctx.save();

    ctx.fillStyle = this.fillColor;

    const {x: leftUpX, y: leftUpY} = this.position
    const {width, depth} = this.dimension;
    const x = leftUpX - width/2;
    const y = leftUpY - depth/2;
 
    ctx.fillRect(x, y,  width, depth);
     
    ctx.restore(); 
   
  }
}

