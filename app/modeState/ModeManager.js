class ModeManager {
  currentMode = new WallMode();
 
  setMode(mode) {
    this.currentMode = mode;
  }


  onClick(event) {
    this.currentMode.onClick(event);
  }

  onMove(event) {
    this.currentMode.onMove(event)
  }

  onKeyDown(event) {
    console.log('===')
    this.currentMode.onKeyDown(event);
  }
}