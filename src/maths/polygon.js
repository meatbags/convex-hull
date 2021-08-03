/** polygon */

import Vector from './vector';
import GetNormal from './get_normal';
import DotProduct from './dot_product';
import PointPlaneDistance from './point_plane_distance';

class Polygon {
  constructor(a, b, c) {
    this.vertex = {a, b, c};
    let ab = new Vector(b.x-a.x, b.y-a.y, b.z-a.z);
    let ac = new Vector(c.x-a.x, c.y-a.y, c.z-a.z);
    this.normal = GetNormal(ab, ac);
    this.centre = new Vector(
      (a.x+b.x+c.x) / 3,
      (a.y+b.y+c.y) / 3,
      (a.z+b.z+c.z) / 3,
    );
  }

  toScreen(v) {
    let t = v.z / 200;
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
    // ctx.stroke();

    // check backface
    if (DotProduct(this.normal, new Vector(0, 0, 1)) < 0) {
      ctx.fill();
    }

    // draw normal vector
    ctx.beginPath();
    let p = this.toScreen(this.centre);
    let pn = this.toScreen(new Vector(
      this.centre.x + this.normal.x*10,
      this.centre.y + this.normal.y*10,
      this.centre.z + this.normal.z*10,
    ));
    ctx.moveTo(cx+p.x, cy+p.y);
    ctx.lineTo(cx+pn.x, cy+pn.y);
    ctx.stroke();
  }
}

export default Polygon;
