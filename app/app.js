class App {
  canvas; // Canvas

  constructor(htmlCanvas) {
    this.canvas = new Canvas(htmlCanvas);    
  }

  run(){
    this.canvas.animate();
  }
}
