const ceil = num => inc(floor(num));
const ceilPrec = (num, prec, pow) => (pow = 10 ** prec) && ceil(num * pow) / pow;
const dec = num => ~-num;
const deg2Rad = num => (num * Math.PI) / 180;
const floor = num => num | 0;
const floorPrec = (num, prec, pow) => (pow = 10 ** prec) && floor(num * pow) / pow;
const inc = num => -~num;
const mean = (...nums) => nums.reduce((sum, cur) => sum + cur) / nums.length;
const median = (...nums) => (
  (nums = { array: nums.sort(), mid: (nums.length + 1) / 2 }),
  nums.array.length % 2 ? nums.array[nums.mid] : (nums.array[floor(nums.mid) - 1] + nums.array[ceil(nums.mid) + 1]) / 2
);
const mode = (...nums) =>
  nums.sort((lhs, rhs) => nums.filter(val => val === lhs).length - nums.filter(val => val === rhs).length).pop();
const rad2Deg = num => (num * 180) / Math.PI;
const randInt = max => floor(Math.random() * max);
const randRange = (min, max, inclusive = true) => randInt(max - min + (inclusive ? 1 : 0)) + min;
const range = (...nums) => Math.max(...nums) - Math.min(...nums);
const roundPrec = (num, prec, pow) => (pow = 10 ** prec) && Math.round(num * pow) / pow;

export {
  ceil,
  ceilPrec,
  dec,
  deg2Rad,
  floor,
  floorPrec,
  inc,
  mean,
  median,
  mode,
  rad2Deg,
  randInt,
  randRange,
  range,
  roundPrec,
};
export default {
  ceil,
  ceilPrec,
  dec,
  deg2Rad,
  floor,
  floorPrec,
  inc,
  mean,
  median,
  mode,
  rad2Deg,
  randInt,
  randRange,
  range,
  roundPrec,
};
