/** cross product */

const CrossProduct = (a, b) => {
  const c = {
    x: a.y*b.z - a.z*b.y,
    y: -(a.x*b.z - a.z*b.x),
    z: a.x*b.y - a.y*b.x,
  };
  return c;
};

export default CrossProduct;
