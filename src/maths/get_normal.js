/** calculate normal vector for polygon */

import Vector from './vector';
import CrossProduct from './cross_product'

const GetNormal = (a, b) => {
  const cp = CrossProduct(a, b);
  const mag = Math.sqrt(cp.x*cp.x + cp.y*cp.y + cp.z*cp.z);
  if (mag === 0) { return cp; }
  cp.x /= mag;
  cp.y /= mag;
  cp.z /= mag;
  return cp;
};

export default GetNormal;
