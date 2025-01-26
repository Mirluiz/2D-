class Object2D {
  uuid;
  fillColor = "red";

  position = { x: 1, y: 1 };
  dimension = { width: 10, height: 10, depth: 10 };
  rotation = 0;

  constructor() {
    this.uuid = uuidv4();
  }

  draw(ctx) {
    ctx.save();

    ctx.fillStyle = this.fillColor;

    const { x: leftUpX, y: leftUpY } = this.position;
    const { width, depth } = this.dimension;
    const x = leftUpX - width / 2;
    const y = leftUpY - depth / 2;

    ctx.translate(leftUpX, leftUpY);
    ctx.rotate(this.rotation);
    ctx.translate(-leftUpX, -leftUpY);
    ctx.fillRect(x, y, width, depth);

    ctx.restore();
  }
}
