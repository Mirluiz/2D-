class ModeManager {
  currentMode = null;

  setMode(mode) {
    this.currentMode = mode;
  }

  onClick(event) {
    this.currentMode?.onClick(event);
  }

  onMove(event) {
    this.currentMode?.onMove(event);
  }

  onKeyDown(event) {
    this.currentMode?.onKeyDown(event);
  }
}
