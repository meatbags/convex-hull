/** app  */

import ConvexHull2D from './modules/convex_hull_2d';

class App {
  constructor() {
    this.modules = {
      convexHull2D: new ConvexHull2D(),
    };
  }
};

window.addEventListener('load', () => {
  const app = new App();
});
