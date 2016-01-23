// hook this up to an env variable of some sort. Completely omits checking
// anything if set to false.
const ACTIVE = true;

const check = (type, value) => {
  const result = type(value);
  if (result instanceof Error) throw result;
  return value;
}

export const enter = (fn, ...types) => (...args) => {
  if (!ACTIVE) return fn(...args);
  if (types.length !== args.length)
    throw new Error('Types and Arguments length does not match');
  types.forEach((type, i) => check(type, args[i]));
  return fn(...args);
};

export const exit = (fn, type) => (...a) => ACTIVE
  ? check(type, fn(...a))
  : fn(...a);

export default {enter, exit};

