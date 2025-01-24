class Canvas {
  html
  
  walls = [];
  corners = [];
  furnites = [];

  context = null;

  width = 0
  height = 0

  constructor(html) {
    this.html = html;
    this.ctx = this.html.getContext('2d');
    this.width = window.innerWidth;
    this.height = window.innerHeight;    
  }

  drawWall() {
    this.walls.forEach(() => {
      // wall
    })
  }

  drawCorner() {
    this.corners.forEach(() => {
      // corner
    })
  }

  drawFurniture() {
    this.furnites.forEach(() => {
      // furnitures
    })
  }

  draw() {
    this.drawWall();
    this.drawCorner();
    this.drawFurniture();
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.draw();
  
    requestAnimationFrame(this.animate.bind(this));
  }
}