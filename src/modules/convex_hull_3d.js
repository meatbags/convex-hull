/** Quick hull */

import Vector from '../maths/vector';
import CrossProduct from '../maths/cross_product';
import ConvexHull from '../maths/convex_hull';

class ConvexHull3D {
  constructor() {
    this.createRandomPoints();
    this.createConvexHull();
    this.draw();
  }

  createRandomPoints() {
    this.points = [];
    for (let i=0; i<40; i++) {
      this.points.push(new Vector(
        (Math.random() * 2 - 1) * 200,
        (Math.random() * 2 - 1) * 200,
        Math.random() * 100,
      ));
    }

    // known hull
    return;

    this.points.push(new Vector(-220, -220, 101));
    this.points.push(new Vector( 220, -220, 101));
    this.points.push(new Vector(-220,  220, 101));
    this.points.push(new Vector( 220,  220, 101));
    this.points.push(new Vector(-220, -220, -1));
    this.points.push(new Vector( 220, -220, -1));
    this.points.push(new Vector(-220,  220, -1));
    this.points.push(new Vector( 220,  220, -1));
  }

  createConvexHull() {
    this.hull = ConvexHull(this.points);
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
  }
}

export default ConvexHull3D;
