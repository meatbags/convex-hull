/** check if angle BC is clockwise relative to AB */

import CrossProduct2D from './cross_product_2d';

const IsClockwiseTurn2D = (a, b, c) => {
  const ab = {x: b.x-a.x, y: b.y-a.y};
  const ac = {x: c.x-a.x, y: c.y-a.y};
  return CrossProduct2D(ab, ac) < 0;
};

export default IsClockwiseTurn2D;
