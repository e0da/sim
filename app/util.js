import { map } from 'ramda';

// Returns false if low < val < high, otherwise returns true.
const outOfRange = (low, high, val) => val <= low || val >= high;

// Returns true if low <= val <= high, otherwise returns false.
const inRange = (low, high, val) => val >= low && val <= high;

// Negates val if test is false, otherwise returns val
const negateIf = (test, val) => (test ? -val : val);

// Logs and returns whatever you pass to it
// FIXME It doesn't always work like I expect. Returns the wrong value
// sometimes? I don't know why.
const debug = (...args) => {
  console.debug(...args); // eslint-disable-line no-console
  return args;
};

// Returns a random item from list
const pickRandom = list => list[Math.floor(Math.random() * list.length)];

const addVectors = (a, b) => [a[0] + b[0], a[1] + b[1]];

const polarToCartesian = vector => [
  vector[0] * Math.cos(vector[1]),
  vector[0] * Math.sin(vector[1]),
];

const cartesianToPolar = vector => [
  Math.hypot(vector[0], vector[1]),
  Math.atan2(vector[0], vector[1]),
];

const scaleVector = (scalar, vector) => map(v => scalar * v, vector);

const distance = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
const collide = (aPosition, aSize, bPosition, bSize) =>
  distance(aPosition, bPosition) <= (aSize + bSize);

const pointInsideBox = (box, point) =>
  inRange(box[0][0], box[1][0], point[0]) &&
  inRange(box[0][1], box[1][1], point[1]);

const angleBetween = (a, b) => Math.atan2(b[1] - a[1], b[0] - a[0]);

export {
  addVectors,
  angleBetween,
  collide,
  cartesianToPolar,
  debug,
  negateIf,
  outOfRange,
  pickRandom,
  pointInsideBox,
  polarToCartesian,
  scaleVector,
};
