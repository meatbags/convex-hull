/** reduce points on polygon */

import VectorsEqual2D from './vectors_equal_2d';
import DistanceToLine2D from './distance_to_line_2d';
import Distance2D from './distance_2d';

const ReducePoints2D = (points, epsilon) => {
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
      ? DistanceToLine2D(points[i], first, last)
      : Distance2D(points[i], first);
    if (d > dmax) {
      dmax = d;
      index = i;
    }
  }

  // create list recursively
  if (dmax > epsilon) {
    const spliced = points.splice(index, points.length - index);
    points.push(spliced[0]);
    const start = ReducePoints2D(points, epsilon);
    const end = ReducePoints2D(spliced, epsilon);
    start.splice(start.length - 1, 1);
    res = start.concat(end);
  } else {
    res = [first, last];
  }

  return res;
};

export default ReducePoints2D;
