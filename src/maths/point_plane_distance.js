/** signed distance from point to plane */

const PointPlaneDistance = (point, p, n) => {
  let wx = point.x - p.x;
  let wy = point.y - p.y;
  let wz = point.z - p.z;
  let dot_nw = (wx*n.x + wy*n.y + wz*n.z);
  let mag_n = Math.sqrt(n.x*n.x + n.y*n.y + n.z*n.z);
  return dot_nw / mag_n;
};

export default PointPlaneDistance;
