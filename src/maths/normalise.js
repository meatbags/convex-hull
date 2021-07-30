/** normalise */

const Normalise = v => {
  let mag = Math.sqrt(v.x*v.x + v.y*v.y + v.z*v.z);
  if (mag == 0) return v;
  v.x /= mag;
  v.y /= mag;
  v.z /= mag;
  return v;
};

export default Normalise;
