/** cross product */

import Vector from './vector';

const CrossProduct = (a, b) => {
  const cp = new Vector(
    a.y*b.z - a.z*b.y,
    a.z*b.x - a.x*b.z,
    a.x*b.y - a.y*b.x,
  );
  return cp;
};

export default CrossProduct;
