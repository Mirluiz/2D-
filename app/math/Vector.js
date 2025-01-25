class Vector {
  static distance (a, b) {
    let ret = Infinity;

    const origin = {x: a.x - b.x, y: a.y - b.y};
    ret = Math.sqrt(Math.pow(origin.x, 2) + Math.pow(origin.y, 2));
    
    return ret;
  } 
}