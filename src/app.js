/** app  */

//import ConvexHull2D from './modules/convex_hull_2d';
import QuickHullTemp from './modules/quick_hull_temp';

class App {
  constructor() {
    this.modules = {
      //convexHull2D: new ConvexHull2D(),
      quickHullTemp: new QuickHullTemp(),
    };
  }
};

window.addEventListener('load', () => {
  const app = new App();
});
