/** Convex Hull 2D */

import GrahamScan from '../maths/graham_scan';
import PointInsideTriangle from '../maths/point_inside_triangle';

class ConvexHull2D {
  constructor() {
    this.run();
  }

  run() {
    // clear
    let cvs = document.querySelector('canvas');
    let ctx = cvs.getContext('2d');
    cvs.width = 400;
    cvs.height = 400;
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, cvs.width, cvs.height);

    // create random points
    let points = [];
    for (let i=0; i<200; i++) {
      let x = (Math.random() * 2 - 1) * 100 + 200;
      let y = (Math.random() * 2 - 1) * 100 + 200;
      points.push({x, y});
    }
    ctx.fillStyle = '#eee';
    points.forEach(p => {
      ctx.fillRect(p.x-1, p.y-1, 2, 2);
    });

    // graham CH solution
    let graham = GrahamScan(points);
    ctx.strokeStyle = '#f00';
    ctx.beginPath();
    graham.forEach(p => { ctx.lineTo(p.x, p.y); });
    ctx.closePath();
    ctx.stroke();

    // create triangle
    let a = {x: Math.random() * 400, y: Math.random() * 400};
    let b = {x: Math.random() * 400, y: Math.random() * 400};
    let c = {x: Math.random() * 400, y: Math.random() * 400};
    let triangle = [a, b, c];
    ctx.strokeStyle = '#f00';
    ctx.beginPath();
    triangle.forEach(p => { ctx.lineTo(p.x, p.y); });
    ctx.closePath();
    ctx.stroke();
    for (let i=0; i<200; i++) {
      let x = (Math.random() * 2 - 1) * 200 + 200;
      let y = (Math.random() * 2 - 1) * 200 + 200;
      let p = {x, y};
      if (PointInsideTriangle(p, a, b, c)) {
        ctx.fillStyle = '#f00';
      } else {
        ctx.fillStyle = '#444';
      }
      ctx.fillRect(x-2, y-2, 4, 4);
    }
  }
}

export default ConvexHull2D;
