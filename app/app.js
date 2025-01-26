class App {
  canvas;
  html;
  modeManager = new ModeManager();
  graph = new Graph();

  constructor(htmlCanvas) {
    this.html = htmlCanvas;
    this.canvas = new Canvas(htmlCanvas);

    this.initListenes();
  }

  initListenes() {
    const startButton = document.querySelector("#startButton");
    if (startButton) {
      startButton.addEventListener("click", () => {
        this.modeManager.setMode(new WallMode(this.canvas, this.graph));
      });
    }

    this.html.addEventListener("click", (event) => {
      this.modeManager.onClick(event);

      if (this.canvas.roomDetected) {
        this.modeManager.setMode(new FurnitureMode(this.canvas, this.graph));
      }
    });

    this.html.addEventListener("mousemove", (event) => {
      this.modeManager.onMove(event);
    });

    window.addEventListener("keydown", (event) => {
      this.modeManager.onKeyDown(event);
    });
  }

  run() {
    this.canvas.animate();
  }
}
