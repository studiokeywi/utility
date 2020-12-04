import { monkeyPatch } from './misc.mjs';
import { randInt } from './math.mjs';

const patch = () => monkeyPatch(Array)({ random, shuffle, swap });
const random = function () {
  return this[randInt(this.length)];
};
const shuffle = function (clone = false) {
  const arr = clone ? [...this] : this;
  for (
    let i = arr.length, j;
    (j = arr.random ? arr.slice(0, i - 1).random() : random.call(arr.slice(0, i - 1))), --i;
    arr.swap ? arr.swap(i, j) : swap.call(arr, i, j)
  );
  return arr;
};
const swap = function (a, b) {
  [this[a], this[b]] = [this[b], this[a]];
};

export default { patch, random, shuffle };
export { patch, random, shuffle };
