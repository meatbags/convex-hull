/* get point-line distance */

import CrossProduct2D from 'cross_product_2d';

const DistanceToLine2D = (point, p1, p2) => {
  const dy = p2.y - p1.y;
  const dx = p2.x - p1.x;
  const cross = CrossProduct2D(p2, p1);
  const mag = Math.hypot(p2.x - p1.x, p2.y - p1.y);
  return Math.abs(dy * point.x - dx * point.y + cross) / mag;
};

export DistanceToLine2D;
