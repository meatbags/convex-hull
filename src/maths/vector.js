/** vector */

class Vector {
  constructor(x=0, y=0, z=0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  copy(v) {
    this.x = v.x;
    this.y = v.y;
    this.z = v.z;
    return this;
  }

  clone() {
    return new Vector(this.x, this.y, this.z);
  }
}

export default Vector;
