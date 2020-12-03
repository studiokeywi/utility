const curry = fn => {
  if ('function' !== typeof fn) throw TypeError`Cannot Curry a non-function`;
  const curry = (...cArgs) => (cArgs.length >= fn.length ? fn(...cArgs) : (...args) => curry(...[...cArgs, ...args]));
  return curry;
};
const debounce = (...config) => {
  if (config.length < 1) throw TypeError`Cannot Debounce without arguments`;
  if (config.length === 1)
    if (!('function' === typeof config[0] || 'object' === typeof config[0]))
      throw TypeError`Error with single argument Debounce -- received ${typeof config[0]}`;

  let fn;
  let delay = 1000;
  let onRise = false;
  let onFall = true;

  ({ fn = fn, delay = delay, onRise = onRise, onFall = onFall } =
    'object' !== typeof config[0]
      ? {
          fn: config[0],
          delay: config[1],
          onRise: config[2],
          onFall: config[3],
        }
      : config);
  if ('function' !== typeof fn) throw TypeError`Cannot Debounce a non-function`;

  let timeOut;
  return (...args) => (
    (timeOut && clearTimeout(timeOut)) || (onRise && fn(...args)),
    (timeOut = setTimeout(() => ((timeOut = null), onFall && fn(...args)), delay))
  );
};
const limit = (...config) => {
  if (config.length < 1) throw TypeError`Cannot Limit without arguments`;
  if (config.length === 1)
    if (!('function' === typeof config[0] || 'object' === typeof config[0]))
      throw TypeError`Error with single argument Limit -- received ${typeof config[0]}`;

  let fn;
  let limit = 1;

  ({ fn = fn, limit = Math.round(limit) } =
    'object' !== typeof config[0]
      ? {
          fn: config[0],
          limit: Math.round(config[1]),
        }
      : config);
  if ('function' !== typeof fn) throw TypeError`Cannot Limit a non-function`;
  if (limit < 1 || isNaN(limit)) throw TypeError`Must specifiy a numeric limit of at least one.`;

  let retVal;
  return (...args) => (limit > 0 && limit-- && (retVal = fn(...args)), retVal);
};
const once = fn => {
  if ('function' !== typeof fn) throw TypeError`Cannot Once a non-function`;

  let hasRun = false;
  let retVal;
  return (...args) => (!hasRun && (hasRun = !!(retVal = fn(...args)) || true), retVal);
};
const poll = (...config) => {
  if (config.length < 1) throw TypeError`Cannot Poll without arguments`;
  if (config.length === 1)
    if (!('function' === typeof config[0] || 'object' === typeof config[0]))
      throw TypeError`Error with single argument Poll -- recieved ${typeof config[0]}`;

  let fn;
  let rate = 1000;
  let trigger = true;

  ({ fn = fn, rate = rate, trigger = trigger } =
    'object' !== typeof config[0]
      ? {
          fn: config[0],
          rate: config[1],
          trigger: config[2],
        }
      : config);
  if ('function' !== typeof fn) throw TypeError`Cannot Poll a non-function`;
  if (isNaN(rate)) throw TypeError`Must specify a numeric value for the rate`;

  if ('function' !== typeof trigger) trigger = () => trigger;
  let pollID;
  return (...args) =>
    (trigger() && fn(...args)) || setInterval(() => trigger() && (clearInterval(pollID), fn(...args)), rate);
};
const queue = (...config) => {
  if (config.length < 1) throw TypeError`Cannot Queue without arguments`;
  if (config.length === 1)
    if (!('function' === typeof config[0] || 'object' === typeof config[0]))
      throw TypeError`Error with single argument Queue -- recieved ${typeof config[0]}`;

  let fn;
  let rate = 1000;
  let cond = true;

  ({ fn = fn, rate = rate, cond = cond } =
    'object' !== typeof config[0]
      ? {
          fn: config[0],
          rate: config[1],
          cond: config[2],
        }
      : config);
  if ('function' !== typeof fn) throw TypeError`Cannot Queue a non-function`;
  if (isNaN(rate)) throw TypeError`Must specify a numeric value for the rate`;

  if ('function' !== typeof cond) cond = () => cond;
  let queueID;
  const queue = [];
  const empty = () => !queue.length;
  return (...args) => (
    empty() &&
      ((queueID = setInterval(
        () => (empty() ? false : cond()) && fn(...queue.shift()),
        empty() && clearInterval(queueID)
      )),
      rate),
    queue.push(args)
  );
};
const throttle = (...config) => {
  if (config.length < 1) throw TypeError`Cannot Throttle without arguments`;
  if (config.length === 1)
    if (!('function' === typeof config[0] || 'object' === typeof config[0]))
      throw TypeError`Error with single argument Throttle -- received ${typeof config[0]}`;

  let fn;
  let rate = 1000;
  let onRise = false;
  let onFall = true;

  ({ fn = fn, rate = rate, onRise = onRise, onFall = onFall } =
    'object' !== typeof config[0]
      ? {
          fn: config[0],
          rate: config[1],
          onRise: config[2],
          onFall: config[3],
        }
      : config);
  if ('function' !== typeof fn) throw TypeError`Cannot Throttle a non-function`;

  let timeOut;
  return (...args) =>
    !timeout && (onRise && fn(...args), (timeOut = setTimeout(() => (timeout = null) && onFall && fn(...args), rate)));
};

export default { curry, debounce, limit, once, poll, queue, throttle };
export { curry, debounce, limit, once, poll, queue, throttle };
