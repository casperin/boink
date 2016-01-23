export const bool = x => {
  if (typeof x !== 'boolean')
    return new Error(x + ' is not a boolean!')
}

export const string = x => {
  if (typeof x !== 'string')
    return new Error(x + ' is not a string!')
}

export const number = x => {
  if (typeof x !== 'number')
    return new Error(x + ' is not a number!')
}

export const array = x => {
  if (!Array.isArray(x))
    return new Error(x + ' is not an array!')
}

export const object = x => {
  if (typeof x !== 'object' || Array.isArray(x))
    return new Error(x + ' is not an object!')
}

export const int = x => {
  if (typeof x !== 'number' || parseInt(x, 10) !== x)
    return new Error(x + ' is not an integer!')
}

export const arrayOf = type => xs => {
  xs.forEach(type);
}

export default {bool, string, number, array, object, int, arrayOf}
