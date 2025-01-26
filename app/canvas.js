class Canvas {
  html;

  walls = [];
  corners = [];
  furnites = [];
  rooms = [];

  context = null;

  width = 0;
  height = 0;

  constructor(html) {
    this.html = html;
    this.ctx = this.html.getContext("2d");
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }

  draw() {
    [...this.walls, ...this.corners, ...this.furnites, ...this.rooms].forEach(
      (obj) => {
        obj.draw(this.ctx);
      }
    );
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.draw();

    requestAnimationFrame(this.animate.bind(this));
  }
}
