/** Convex Hull */

const AngleBetween = (a, b) => {
  return Math.atan2(b.y - a.y, b.x - a.x);
};
const MinAngleBetween = function(a, b) {
  return Math.atan2(Math.sin(b - a), Math.cos(b - a))
};
const IsClockwise = (a, b, c) => {
  let ab = AngleBetween(a, b);
  let bc = AngleBetween(b, c);
  let delta = MinAngleBetween(ab, bc);
  return delta < 0;
};

class ConvexHull {
  static grahamScan(points) {
    // copy pts
    let pts = points.map(p => ({ ...p }));

    // get lowest point (guaranteed to be on hull)
    let start = null;
    let yMin = null;
    pts.forEach(p => {
      if (yMin === null || p.y < yMin) {
        start = p;
        yMin = p.y;
      }
    });

    // order by angle from start->point (0 -> Math.PI)
    pts = pts.filter(p => p.x !== start.x && p.y !== start.y);
    pts.sort((a, b) => {
      let thetaA = AngleBetween(start, a);
      let thetaB = AngleBetween(start, b);
      return thetaA - thetaB;
    });
    pts.unshift(start);

    // iterate over points
    let stack = [pts[0], pts[1]];
    let index = 2;

    while (true) {
      // points to check
      let a = stack[stack.length-2];
      let b = stack[stack.length-1];
      let c = pts[index];

      // while clockwise, pop from stack
      while (IsClockwise(a, b, c)) {
        console.log(a, b, c, stack.length);
        stack.splice(stack.length-1, 1);
        a = stack[stack.length-2];
        b = stack[stack.length-1];
      }

      // add to stack
      stack.push(c);

      // increment, check done
      if (++index >= pts.length) {
        break;
      }
    }

    return stack;
  }
};

window.addEventListener('load', () => {
  // create random points
  let points = [];
  for (let i=0; i<20; i++) {
    let x = (Math.random() * 2 - 1) * 100 + 200;
    let y = (Math.random() * 2 - 1) * 100 + 200;
    points.push({x, y});
  }

  // graham scan
  let graham = ConvexHull.grahamScan(points);

  // draw points
  let cvs = document.querySelector('canvas');
  let ctx = cvs.getContext('2d');
  cvs.width = 400;
  cvs.height = 400;
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, cvs.width, cvs.height);

  // points
  ctx.fillStyle = '#fff';
  points.forEach(p => {
    ctx.fillRect(p.x-1, p.y-1, 2, 2);
  });

  // graham
  ctx.strokeStyle = '#f00';
  ctx.beginPath();
  graham.forEach(p => { ctx.lineTo(p.x, p.y); });
  ctx.closePath();
  ctx.stroke();
});
