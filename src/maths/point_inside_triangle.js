/** Check if P is inside ABC */

const PointInsideTriangle = (p, A, B, C) => {
  const area = 0.5 * (-B.y*C.x + A.y * (C.x-B.x) + A.x * (B.y-C.y) + B.x*C.y);
  const sign = area < 0 ? -1 : 1;
  const s = (A.y*C.x - A.x*C.y + (C.y-A.y) * p.x + (A.x-C.x) * p.y) * sign;
  const t = (A.x*B.y - A.y*B.x + (A.y-B.y) * p.x + (B.x-A.x) * p.y) * sign;
  return s > 0 && t > 0 && (s + t) < 2 * area * sign;
};

export default PointInsideTriangle;
