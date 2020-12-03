const ceilPrec = (num, prec, pow) => (pow = 10 ** prec) && Math.ceil(num * pow) / pow;
const deg2Rad = num => (num * Math.PI) / 180;
const floorPrec = (num, prec, pow) => (pow = 10 ** prec) && Math.floor(num * pow) / pow;
const mean = (...nums) => nums.reduce((sum, cur) => sum + cur) / nums.length;
const median = (...nums) => (
  (nums = { array: nums.sort(), mid: (nums.length + 1) / 2 }),
  nums.array.length % 2
    ? nums.array[nums.mid]
    : (nums.array[Math.floor(nums.mid) - 1] + nums.array[Math.ceil(nums.mid) + 1]) / 2
);
const mode = (...nums) =>
  nums.sort((lhs, rhs) => nums.filter(val => val === lhs).length - nums.filter(val => val === rhs).length).pop();
const rad2Deg = num => (num * 180) / Math.PI;
const randInt = max => (Math.random() * max) | 0;
const randRange = (min, max, inclusive = true) => randInt(max - min + (inclusive ? 1 : 0)) + min;
const range = (...nums) => Math.max(...nums) - Math.min(...nums);
const roundPrec = (num, prec, pow) => (pow = 10 ** prec) && Math.round(num * pow) / pow;

export { ceilPrec, deg2Rad, floorPrec, mean, median, mode, rad2Deg, randInt, randRange, range, roundPrec };
export default { ceilPrec, deg2Rad, floorPrec, mean, median, mode, rad2Deg, randInt, randRange, range, roundPrec };
