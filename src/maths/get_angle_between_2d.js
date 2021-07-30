/** get angle between points */

const GetAngleBetween2D = (a, b) => {
  return Math.atan2(b.y - a.y, b.x - a.x);
};

export default GetAngleBetween2D;
