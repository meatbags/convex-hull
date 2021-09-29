/** Quick hull */

import Vector from '../maths/vector';
import CrossProduct from '../maths/cross_product';
import ConvexHull from '../maths/convex_hull';
import GetUniquePoints from '../maths/get_unique_points';

class ConvexHull3D {
  constructor() {
    this.createRandomPoints();
    this.createConvexHull();
    this.draw();
  }

  createRandomPoints() {
    this.points = [];
    for (let i=0; i<30; i++) {
      this.points.push(new Vector(
        (Math.random() * 2 - 1) * 200,
        (Math.random() * 2 - 1) * 200,
        Math.random() * 100,
      ));
    }
  }

  createConvexHull() {
    this.hull = ConvexHull(this.points);
    this.hull2 = ConvexHull(this.points, 60);
  }

  draw() {
    // clear canvas
    this.canvas = document.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = 800;
    this.canvas.height = 800;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // draw points
    let cx = this.canvas.width / 2;
    let cy = this.canvas.height / 2;
    this.ctx.fillStyle = '#fff';
    this.points.forEach(p => {
      let t = p.z / 200;
      let x = cx + p.x - p.x * t;
      let y = cy + p.y - p.y * t;
      let size = (1 - t) * 5;
      this.ctx.fillRect(x, y, size, size);
    });

    // draw hull
    this.ctx.fillStyle = '#222';
    this.ctx.globalAlpha = 1;
    this.ctx.strokeStyle = '#f00';
    this.hull.forEach(poly => {
      poly.draw(this.ctx);
    });

    // draw reduced hull
    this.ctx.fillStyle = '#222';
    this.ctx.globalAlpha = 1;
    this.ctx.strokeStyle = '#00f';
    this.hull2.forEach(poly => {
      poly.draw(this.ctx);
    });

    // get stats
    const points = [];
    const points2 = [];
    this.hull.forEach(p => { points.push(p.vertex.a); points.push(p.vertex.b); points.push(p.vertex.c); })
    this.hull2.forEach(p => { points2.push(p.vertex.a); points2.push(p.vertex.b); points2.push(p.vertex.c); })
    const count = GetUniquePoints(points).length;
    const count2 = GetUniquePoints(points2).length;

    // draw stats
    this.ctx.fillStyle = '#fff';
    this.ctx.font = '20px Arial';
    this.ctx.fillText(`Points: ${this.points.length}`, 20, 35);
    this.ctx.fillText(`Hull Points: ${count}`, 20, 70);
    this.ctx.fillText(`Polygons: ${this.hull.length}`, 20, 105);
    this.ctx.fillText(`Hull 2 Points: ${count2}`, 20, 140);
    this.ctx.fillText(`Polygons: ${this.hull2.length}`, 20, 175);
  }
}

export default ConvexHull3D;
