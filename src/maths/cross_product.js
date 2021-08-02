/** cross product */

import Vector from './vector';

const CrossProduct = (a, b) => {
  const v = new Vector(
    a.y*b.z - a.z*b.y,
    -(a.x*b.z - a.z*b.x),
    a.x*b.y - a.y*b.x,
  );
  return v;
};

export default CrossProduct;
