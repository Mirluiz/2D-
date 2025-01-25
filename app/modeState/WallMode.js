class WallMode extends Mode {
  canvas
  active

  constructor(canvas){
    super();
    
    this.canvas = canvas;
  }

  onClick(event) {
    const rect = canvas.getBoundingClientRect();  
    const x = event.clientX - rect.left; 
    const y = event.clientY - rect.top;

    if(this.active) {
      this.active = null;
    } 

    const snap = this.checkForSnap(x, y);
    const newWall = new Wall() 
     
    if(snap) {  
      newWall.start.position = {x: snap.x, y: snap.y};
      newWall.end.position = {x: snap.x, y: snap.y};  
    } else { 
      newWall.start.position = {x, y};
      newWall.end.position = {x, y};
    }
 
    this.active = newWall; 
    this.canvas.walls.push(newWall);
 
  }

  onMove(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left; 
    const y = event.clientY - rect.top; 
 
    if(this.active) {
      const snap = this.checkForSnap(x, y);
      if(snap) {
        this.active.end.position = {x: snap.x, y: snap.y};
      } else {
        this.active.end.position = {x, y};
      }
    }
  }

  onKeyDown(event) {
    // 
  }

  checkForSnap(x, y) {
    let ret = null;
    const vec = {x, y};

    this.canvas.walls.forEach(wall => {
      if(wall.uuid === this.active?.uuid || ret) {
        return;
      }

      const distanceToStart = Vector.distance(wall.start.position, vec);
      const distanceToEnd = Vector.distance(wall.end.position, vec);

      if(distanceToStart < 16) {
          ret = {x: wall.start.position.x, y: wall.start.position.y};
      } else if (distanceToEnd < 16) {
          ret = {x: wall.end.position.x, y: wall.end.position.y};
      } else {
        if(Math.abs(wall.start.position.x - x) < 8) {
          ret = {x: wall.start.position.x, y}
        } 
        
        if (Math.abs(wall.start.position.y - y) < 8){
          ret = {x, y: wall.start.position.y} 
        }
        
        if(Math.abs(wall.end.position.x -  x) < 8) {
          ret = {x: wall.end.position.x, y}
        }
        
        if (Math.abs(wall.end.position.y - y) < 8){
          ret = {x, y: wall.end.position.y}
        }
      }

      
    });

    return ret;
  }
}
