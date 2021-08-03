/** bounding box */

import Vector from './vector';

class Box {
  constructor() {
    this.min = new Vector();
    this.max = new Vector();
  }

  getCentre() {
    return new Vector(
      (this.min.x + this.max.x) / 2,
      (this.min.y + this.max.y) / 2,
      (this.min.z + this.max.z) / 2,
    );
  }

  fromPoints(points) {
    this.min.x = this.max.x = points[0].x;
    this.min.y = this.max.y = points[0].y;
    this.min.z = this.max.z = points[0].z;
    points.forEach(p => {
      this.min.x = Math.min(this.min.x, p.x);
      this.min.y = Math.min(this.min.y, p.y);
      this.min.z = Math.min(this.min.z, p.z);
      this.max.x = Math.max(this.max.x, p.x);
      this.max.y = Math.max(this.max.y, p.y);
      this.max.z = Math.max(this.max.z, p.z);
    });
  }
}

export default Box;
