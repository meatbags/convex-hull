/** polygon */

import Vector from './vector';
import CrossProduct from './cross_product';
import DotProduct from './dot_product';

class Polygon {
  constructor(a, b, c) {
    this.vertex = {a: a, b: b, c: c};
    let ba = new Vector(a.x-b.x, a.y-b.y, a.z-b.z);
    let ca = new Vector(a.x-c.x, a.y-c.y, a.z-c.z);
    this.normal = CrossProduct(a, b);
    this.normal.normalise();
    if (this.normal.getLength() == 0) {
      this.normal.y = 1;
    }
  }

  toScreen(v) {
    let t = v.z / 100;
    let x = v.x - v.x * t;
    let y = v.y - v.y * t;
    return {x, y};
  }

  draw(ctx) {
    let cx = ctx.canvas.width / 2;
    let cy = ctx.canvas.height / 2;
    let a = this.toScreen(this.vertex.a);
    let b = this.toScreen(this.vertex.b);
    let c = this.toScreen(this.vertex.c);
    ctx.beginPath();
    ctx.moveTo(cx+a.x, cy+a.y);
    ctx.lineTo(cx+b.x, cy+b.y);
    ctx.lineTo(cx+c.x, cy+c.y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
}

export default Polygon;
