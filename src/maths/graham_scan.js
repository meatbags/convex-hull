/**
  convex hull Graham Scan method
  note:
    - does not account for co-linear points
    - instead uses point reduction pass with small epsilon
  */

import GetAngleBetween2D from './get_angle_between_2d';
import IsClockwiseTurn2D from './is_clockwise_turn_2d';

const GrahamScan = points => {
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
    let thetaA = GetAngleBetween2D(start, a);
    let thetaB = GetAngleBetween2D(start, b);
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
    while (IsClockwiseTurn2D(a, b, c)) {
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
