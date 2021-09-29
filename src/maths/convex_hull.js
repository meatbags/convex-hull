/** create convex hull */

import PointPlaneDistance from './point_plane_distance';
import Box from './box';
import Vector from './vector';
import Polygon from './polygon';

const SURFACE_EPSILON = 0.01;
const PI_TWO_THIRDS = Math.PI * 2 / 3;
const PI_FOUR_THIRDS = Math.PI * 4 / 3;

const FindHull = (polygon, points, epsilon=null) => {
  const filtered = [];
  if (epsilon === null) {
    epsilon = SURFACE_EPSILON;
  }

  // find points above plane, furthest point
  let peak = null;
  let dist = null;
  points.forEach(p => {
    let d = PointPlaneDistance(p, polygon.vertex.a, polygon.normal);
    if (d > epsilon) {
      filtered.push(p);
      if (peak === null || d > dist) {
        peak = p;
        dist = d;
      }
    }
  });

  // break
  if (peak === null) {
    return [polygon];
  }

  // create new polygons
  const p1 = new Polygon(peak, polygon.vertex.a, polygon.vertex.b);
  const p2 = new Polygon(peak, polygon.vertex.b, polygon.vertex.c);
  const p3 = new Polygon(peak, polygon.vertex.c, polygon.vertex.a);

  // final point -- break
  if (filtered.length == 1) {
    return [p1, p2, p3];

  // continue
  } else {
    return [
      ...FindHull(p1, filtered),
      ...FindHull(p2, filtered),
      ...FindHull(p3, filtered),
    ];
  }
};

const ConvexHull = (points, epsilon=null) => {
  // get centre of points
  const box = new Box();
  box.fromPoints(points);
  const origin = box.getCentre();

  // get starting unit tetrahedron
  const n1 = new Vector(Math.sqrt(8/9), 0, -1/3);
  const n2 = new Vector(-Math.sqrt(2/9), Math.sqrt(2/3), -1/3);
  const n3 = new Vector(-Math.sqrt(2/9), -Math.sqrt(2/3), -1/3);
  const n4 = new Vector(0, 0, 1);
  let p1 = null;
  let p2 = null;
  let p3 = null;
  let p4 = null;
  let dist1 = null;
  let dist2 = null;
  let dist3 = null;
  let dist4 = null;

  points.forEach(p => {
    let d1 = PointPlaneDistance(p, origin, n1);
    let d2 = PointPlaneDistance(p, origin, n2);
    let d3 = PointPlaneDistance(p, origin, n3);
    let d4 = PointPlaneDistance(p, origin, n4);
    if (p1 === null || d1 > dist1) { p1 = p; dist1 = d1; }
    if (p2 === null || d2 > dist2) { p2 = p; dist2 = d2; }
    if (p3 === null || d3 > dist3) { p3 = p; dist3 = d3; }
    if (p4 === null || d4 > dist4) { p4 = p; dist4 = d4; }
  });

  const f1 = new Polygon(p1, p2, p4);
  const f2 = new Polygon(p2, p3, p4);
  const f3 = new Polygon(p3, p1, p4);
  const f4 = new Polygon(p1, p3, p2);

  const hull = [
    ...FindHull(f1, points, epsilon),
    ...FindHull(f2, points, epsilon),
    ...FindHull(f3, points, epsilon),
    ...FindHull(f4, points, epsilon),
  ];

  return hull;
};

export default ConvexHull;
