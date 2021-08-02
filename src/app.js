/** app  */

<<<<<<< HEAD
import ConvexHull from './modules/convex_hull';
import ConvexHull2D from './modules/convex_hull_2d';
=======
//import ConvexHull2D from './modules/convex_hull_2d';
import QuickHullTemp from './modules/quick_hull_temp';
>>>>>>> 0e1e730ded0daa918eb03b6d306b90deb7799b3f

class App {
  constructor() {
    this.modules = {
<<<<<<< HEAD
      convexHull: new ConvexHull(),
      // convexHull2D: new ConvexHull2D(),
=======
      //convexHull2D: new ConvexHull2D(),
      quickHullTemp: new QuickHullTemp(),
>>>>>>> 0e1e730ded0daa918eb03b6d306b90deb7799b3f
    };
  }
};

window.addEventListener('load', () => {
  const app = new App();
});
