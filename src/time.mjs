import { monkeyPatch } from './misc.mjs';

const shiftModes = [
  'Date',
  'Day',
  'FullYear',
  'Hours',
  'Milliseconds',
  'Minutes',
  'Month',
  'Seconds',
  'UTCDate',
  'UTCDay',
  'UTCFullYear',
  'UTCHours',
  'UTCMilliseconds',
  'UTCMinutes',
  'UTCMonth',
  'UTCSeconds',
];
const patch = () => monkeyPatch(Date)({ shift });
const shift = function (mode, clone = false) {
  if (!shiftModes.includes(mode)) {
    throw new TypeError(
      `Cannot shift a Date object in that fashion; no matching get${mode} and set${mode} functions available`
    );
  }
  return function (amt) {
    const date = clone ? new this.constructor(this) : this;
    date[`set${mode}`](date[`get${mode}`]() + amt);
    return date;
  }.bind(this);
};

export default { patch, shift };
export { patch, shift };
