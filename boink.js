// hook this up to an env variable of some sort. Completely omits checking
// anything if set to false.
const ACTIVE = true;
const HARDCORE = false;
const THROW = true;
const LOG = false;

const check = (type, value) => {
  const result = type(value);
  if (result instanceof Error) {
    if (LOG) console.error(result.message);
    if (THROW) throw result;
    if (HARDCORE) debugger;
  }
  return value;
}

export const enter = (...types) => fn => (...args) => {
  if (!ACTIVE) return fn(...args);
  if (types.length !== args.length) {
    if (LOG) console.error('Types and Arguments length does not match');
    if (THROW) throw new Error('Types and Arguments length does not match');
    if (HARDCORE) debugger;
  }
  types.forEach((type, i) => check(type, args[i]));
  return fn(...args);
};

export const exit = type => fn => (...a) => ACTIVE
  ? check(type, fn(...a))
  : fn(...a);

export const boink = (...types) => type => fn => {
  fn = enter(...types)(fn);
  return exit(type)(fn);
};

export default {enter, exit};

