class Vector {
  static distance(a, b) {
    let ret = Infinity;

    const origin = { x: a.x - b.x, y: a.y - b.y };
    ret = Math.sqrt(Math.pow(origin.x, 2) + Math.pow(origin.y, 2));

    return ret;
  }

  static multiplyScalar(a, S) {
    return { x: a.x * S, y: a.y * S };
  }

  static vectorLn(a) {
    return Math.sqrt(Math.pow(a.x, 2) + Math.pow(a.y, 2));
  }

  static dot(a, b) {
    return a.x * b.x + a.y * b.y;
  }

  static sub(a, b) {
    return { x: a.x - b.x, y: a.y - b.y };
  }
}
