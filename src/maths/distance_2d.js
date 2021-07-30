/** distance between points */

const Distance2D = (a, b) => {
  return Math.hypot(a.x - b.x, a.y - b.y);
};

export default Distance2D;
