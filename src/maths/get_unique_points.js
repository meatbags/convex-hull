/** Get unique points from a set of points */

const GetUniquePoints = points => {
  let map = {};
  let res = [];
  points.forEach(p => {
    if (!map[p.x]) { map[p.x] = {}; };
    if (!map[p.x][p.y]) { map[p.x][p.y] = {}; }
    if (!map[p.x][p.y][p.z]) {
      map[p.x][p.y][p.z] = 1;
      res.push(p);
    }
  });
  return res;
};

export default GetUniquePoints;
