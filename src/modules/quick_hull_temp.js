/** Quick hull */

import Vector from '../maths/vector';
import Polygon from '../maths/polygon';
import PointPlaneDistance from '../maths/point_plane_distance';

class QuickHullTemp {
  constructor() {
    // canvas
    this.canvas = document.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = 800;
    this.canvas.height = 800;

    // get points
    this.points = [];
    //let max = 200;
    //this.points.push(new Vector(max, 0, 0));
    //this.points.push(new Vector(Math.cos(Math.PI*2/3)*max, 0, Math.sin(Math.PI*2/3)*max));
    //this.points.push(new Vector(Math.cos(Math.PI*4/3)*max, 0, Math.sin(Math.PI*4/3)*max));

    for (let i=0; i<40; i++) {
      this.points.push(new Vector(
        (Math.random() * 2 - 1) * 200,
        (Math.random() * 2 - 1) * 200,
        Math.random() * 100,
      ));
    }

    // create hull
    this.createConvexHull();

    // draw
    this.render();
  }

  createConvexHull() {
    this.hull = [];
    let origin = new Vector(0, 0, 0);
    let normal1 = new Vector(1, 0, 0);
    let normal2 = new Vector(Math.cos(Math.PI*2/3), 0, Math.sin(Math.PI*2/3));
    let normal3 = new Vector(Math.cos(Math.PI*4/3), 0, Math.sin(Math.PI*4/3));
    let p1 = null;
    let dist1 = null;
    let p2 = null;
    let dist2 = null;
    let p3 = null;
    let dist3 = null;
    this.points.forEach(p => {
      let d1 = PointPlaneDistance(p, origin, normal1);
      let d2 = PointPlaneDistance(p, origin, normal2);
      let d3 = PointPlaneDistance(p, origin, normal3);
      if (p1 === null || d1 > dist1) { p1 = p; dist1 = d1; }
      if (p2 === null || d2 > dist2) { p2 = p; dist2 = d2; }
      if (p3 === null || d3 > dist3) { p3 = p; dist3 = d3; }
    });

    // recursively build convex hull
    let get_hull_recursive = (polygon, points) => {
      let res = [];

      // find tip of simplex above distance threshold
      let epsilon = 0.1;
      let dist = null;
      let tip = null;
      let points_above = [];
      points.forEach(p => {
        let d = PointPlaneDistance(p, polygon.vertex.a, polygon.normal);
        if (d > epsilon) {
          points_above.push(p);
          if (tip === null || d > dist) {
            tip = p;
            dist = d;
          }
        }
      });

      // no points above polygon, solution found
      if (tip === null) {
        return [polygon];
      }

      // points above polygon, create simplex
      let poly1 = new Polygon(polygon.vertex.a, tip, polygon.vertex.c);
      let poly2 = new Polygon(polygon.vertex.b, tip, polygon.vertex.a);
      let poly3 = new Polygon(polygon.vertex.c, tip, polygon.vertex.b);

      // no more points
      if (points_above.length == 1) {
        return [poly1, poly2, poly3];

      // process remaining points
      } else {
        return [
          ...get_hull_recursive(poly1, points_above),
          ...get_hull_recursive(poly2, points_above),
          ...get_hull_recursive(poly3, points_above),
        ];
      }
    };

    // build up, down
    let poly = new Polygon(p1, p2, p3);
    this.hull = get_hull_recursive(poly, this.points);
    //poly.normal.invert();
    //this.hull = [ ...this.hull, ...get_hull_recursive(poly, this.points) ];
  }

  render() {
    let cx = this.canvas.width / 2;
    let cy = this.canvas.height / 2;
    this.ctx.fillStyle = '#fff';
    this.points.forEach(p => {
      let t = p.z / 100;
      let x = cx + p.x - p.x * t;
      let y = cy + p.y - p.y * t;
      let size = (1 - t) * 5;
      this.ctx.fillRect(x, y, size, size);
    });

    this.ctx.fillStyle = '#222';
    this.ctx.globalAlpha = 0.2;
    this.ctx.strokeStyle = '#fff';
    this.hull.forEach(poly => {
      poly.draw(this.ctx);
    });
  }
}

export default QuickHullTemp;
