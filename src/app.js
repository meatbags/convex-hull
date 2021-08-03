/** app  */

import ConvexHull3D from './modules/convex_hull_3d';

class App {
  constructor() {
    this.modules = {
      convexHull3D: new ConvexHull3D(),
    };
  }
};

window.addEventListener('load', () => {
  const app = new App();
});
