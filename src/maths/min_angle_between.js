/** get minimum angle between angles */

const MinAngleBetween = function(a, b) {
  return Math.atan2(Math.sin(b - a), Math.cos(b - a))
};

export default MinAngleBetween;
