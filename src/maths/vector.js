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

  normalise() {
    let mag = Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);
    if (mag == 0) { return this; }
    this.x /= mag;
    this.y /= mag;
    this.z /= mag;
  }

  invert() {
    this.x *= -1;
    this.y *= -1;
    this.z *= -1;
  }

  getLength() {
    return Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);
  }

  clone() {
    return new Vector(this.x, this.y, this.z);
  }
}

export default Vector;
