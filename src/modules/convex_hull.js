/** Quick hull */

import Vector from '../maths/vector';

class ConvexHull {
  constructor() {
    this.run();
    this.draw();
  }

  run() {
    this.points = [];
    for (let i=0; i<500; i++) {
      let x = (Math.random() * 2 - 1) * 100 + 200;
      let y = (Math.random() * 2 - 1) * 100 + 200;
      let z = Math.random() * 400;
      this.points.push(new Vector(x, y, z));
    }
  }

  draw() {
    let cvs = document.querySelector('canvas');
    let ctx = cvs.getContext('2d');
    let w = 400;
    let h = 400;
    cvs.width = w;
    cvs.height = h;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#fff';
    ctx.globalAlpha = 0.25;
    this.points.forEach(p => {
      let depth = p.z / 400;
      let x = p.x + (w/2 - p.x) * depth;
      let y = p.y + (h/2 - p.y) * depth;
      let size = (1 - depth) * 10;
      //ctx.fillStyle = depth > 0.5 ? '#f00' : '#00f';
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.arc(x - size/2, y - size/2, size, 0, Math.PI * 2);
      ctx.fill();
    });
  }
}

export default ConvexHull;
