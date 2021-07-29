/** Convex Hull */

const AngleBetween = (a, b) => {
  return Math.atan2(b.y - a.y, b.x - a.x);
};

const MinAngleBetween = function(a, b) {
  return Math.atan2(Math.sin(b - a), Math.cos(b - a))
};

const Distance = (a, b) => {
  return Math.hypot(a.x - b.x, a.y - b.y);
};

const DistanceToLine = (point, p1, p2) => {
  const dy = p2.y - p1.y;
  const dx = p2.x - p1.x;
  const cp = CrossProduct(p2, p1);
  const mag = Distance(p1, p2);
  return Math.abs(dy * point.x - dx * point.y + cp) / mag;
};

const CrossProduct = (a, b) => {
  return a.x*b.y - a.y*b.x;
};

const PointInsideTetrahedron = (point, A, B, C, D) => {
  
};

const PointInsideTriangle = (p, a, b, c) => {
  // sides
  let AB = {x: b.x-a.x, y: b.y-a.y};
  let AC = {x: c.x-a.x, y: c.y-a.y};
  let BA = {x: a.x-b.x, y: a.y-b.y};
  let BC = {x: c.x-b.x, y: c.y-b.y};
  let CA = {x: a.x-c.x, y: a.y-c.y};
  let CB = {x: b.x-c.x, y: b.y-c.y};

  // to point
  let AP = {x: p.x-a.x, y: p.y-a.y};
  let BP = {x: p.x-b.x, y: p.y-b.y};
  let CP = {x: p.x-c.x, y: p.y-c.y};

  // cross products
  return (
    Math.sign(CrossProduct(AB, AC)) === Math.sign(CrossProduct(AB, AP)) &&
    Math.sign(CrossProduct(BC, BA)) === Math.sign(CrossProduct(BC, BP)) &&
    Math.sign(CrossProduct(CA, CB)) === Math.sign(CrossProduct(CA, CP))
  );
};

const IsClockwise = (a, b, c) => {
  const ab = {x: b.x-a.x, y: b.y-a.y};
  const ac = {x: c.x-a.x, y: c.y-a.y};
  return CrossProduct(ab, ac) < 0;
};

const VectorsEqual = (a, b) => {
  return a.x === b.x && a.y === b.y;
}

class ConvexHull {
  static getHull2D(points) {
    let p = ConvexHull.grahamScan2D(points);
    let len1 = p.length;
    p = ConvexHull.reducePoints2D(p, 1);
    console.log(len1, p.length);
    return p;
  }

  static reducePoints2D(points, epsilon) {
    if (points.length <= 2) {
      return points;
    }

    const first = points[0];
    const last = points[points.length - 1];
    const isClosed = VectorsEqual(first, last);
    let dmax = 0;
    let index = 0;
    let res = [];

    // find index of furthest point from line
    for (let i=1, lim=points.length-1; i<lim; ++i) {
      const d = isClosed === false
        ? DistanceToLine(points[i], first, last)
        : Distance(points[i], first);
      if (d > dmax) {
        dmax = d;
        index = i;
      }
    }

    // create list recursively
    if (dmax > epsilon) {
      const spliced = points.splice(index, points.length - index);
      points.push(spliced[0]);
      const start = ConvexHull.reducePoints2D(points, epsilon);
      const end = ConvexHull.reducePoints2D(spliced, epsilon);
      start.splice(start.length - 1, 1);
      res = start.concat(end);
    } else {
      res = [first, last];
    }

    return res;
  }

  static grahamScan2D(points) {
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

  static quickHull2D(points) {
    // 1. find min and max point by x
    let a = null;
    let b = null;
    points.forEach(p => {
      if (a === null || p.x < a.x) { a = p; }
      if (b === null || p.x > b.x) { b = p; }
    });

    // 2. divide points into two groups (either side of line min_x->max_x)
    let vec = {x: b.x-a.x, y: b.y - a.y};
    let set1 = [];
    let set2 = [];
    points.forEach(p => {
      if (VectorsEqual(p, a) || VectorsEqual(p, b)) {
        return;
      }
      let test = {x: p.x-a.x, y:p.y-a.y};
      if (CrossProduct(vec, test) < 0) {
        set1.push(p);
      } else {
        set2.push(p);
      }
    });

    // ...
  }
};

window.addEventListener('load', () => {
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
  ctx.fillStyle = '#222';
  points.forEach(p => {
    ctx.fillRect(p.x-1, p.y-1, 2, 2);
  });

  // graham CH solution
  let graham = ConvexHull.getHull2D(points);
  ctx.strokeStyle = '#f00';
  ctx.beginPath();
  graham.forEach(p => { ctx.lineTo(p.x, p.y); });
  ctx.closePath();
  ctx.stroke();

  // create triangle
  let a = {x: 200, y:  40};
  let b = {x:  40, y: 360};
  let c = {x: 380, y: 360};
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
    ctx.fillRect(x-1, y-1, 2, 2);
  }
});
