class App {
  canvas; // Canvas
  html;
  modeManager = new ModeManager();
  ui_mode; // black / white
  graph = new Graph();

  constructor(htmlCanvas) {
    this.html = htmlCanvas;
    this.canvas = new Canvas(htmlCanvas);

    const examples = this.generateWalls();
    examples.forEach((n) => {
      this.canvas.walls.push(n);
    });

    this.modeManager.setMode(new WallMode(this.canvas, this.graph));
    this.initListenes();
  }

  initListenes() {
    this.html.addEventListener("click", (event) => {
      this.modeManager.currentMode.onClick(event);

      if (this.canvas.roomDetected) {
        this.modeManager.setMode(new FurnitureMode(this.canvas, this.graph));
      }
    });

    this.html.addEventListener("mousemove", (event) => {
      this.modeManager.currentMode.onMove(event);
    });

    window.addEventListener("keydown", (event) => {
      this.modeManager.currentMode.onKeyDown(event);
    });
  }

  run() {
    this.canvas.animate();
  }

  generateWalls() {
    const ret = [];

    // {
    //   const newWall = new Wall();
    //   newWall.start = { x: 100, y: 100 };
    //   newWall.end = { x: 300, y: 100 };
    //   ret.push(newWall);
    // }

    // {
    //   const newWall = new Wall();
    //   newWall.start.position = {x: 10, y: 10};
    //   newWall.end.position = {x: 50, y: 50};
    //   ret.push(newWall);
    // }

    return ret;
  }
}
