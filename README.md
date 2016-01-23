```
           _               _             _          _             _
          / /\            /\ \          /\ \       /\ \     _    /\_\
         / /  \          /  \ \         \ \ \     /  \ \   /\_\ / / /  _
        / / /\ \        / /\ \ \        /\ \_\   / /\ \ \_/ / // / /  /\_\
       / / /\ \ \      / / /\ \ \      / /\/_/  / / /\ \___/ // / /__/ / /
      / / /\ \_\ \    / / /  \ \_\    / / /    / / /  \/____// /\_____/ /
     / / /\ \ \___\  / / /   / / /   / / /    / / /    / / // /\_______/
    / / /  \ \ \__/ / / /   / / /   / / /    / / /    / / // / /\ \ \
   / / /____\_\ \  / / /___/ / /___/ / /__  / / /    / / // / /  \ \ \
  / / /__________\/ / /____\/ //\__\/_/___\/ / /    / / // / /    \ \ \
  \/_____________/\/_________/ \/_________/\/_/     \/_/ \/_/      \_\_\

```

# Boink

Pragmatic custom "type checking".

The module consists of two separate parts: `boink.js` and `type.js` with no
connection between them.

In `boink.js` you will find `enter` and `exit` which are both function wrappers,
checking the types of the applied function's entrance (`enter`) and exit
(`exit`) variabels.

## Usage

```js
import {enter} from './boink';
import * as Type from './type';

isLength = enter(isLength, Type.int, Type.string);
function isLength (n, str) {
  return str.length === n;
}

// All good, we get our value (true)
isLength(3, 'foo');

// Not so good. This will throw an error
isLength(3.5, 'foo');
```

### Custom types

I mostly use custom types personally.

```js
/**
 * customTypes.js
 */
export const Person = x => {
  if (typeof x !== 'object')
    return new Error('A person is always an object');
  if (typeof x.name !== 'string')
    return new Error('A person must have a name');
  if (typeof x.age !== 'number')
    return new Error('A person must have an age');
};

// ...

/**
 * soemwhereElse.js
 */
import {enter, exit} from './boink';
import {int, bool} from './type';
import {Person} from './customTypes';

// Applying
hasAge = enter(hasAge, int, TypePerson);
hasAge = exit(hasAge, bool};
function hasAge (age, person) {
  return person.age === age;
}

// Let's try it out
hasAge(4, {name: 'Alice', age: 4}) // true
hasAge(2, {name: 'Bob'}) // Throws 'A person must have an age'
```


## Api / Documentation

`boink.js` contains only `enter` and `exit`, checking arguments coming into a
wrapped function, and the value coming out. `enter` also checks that arity is
correct when calling the function.

```js
enter(fn, ...types);
// `types` here, refers to functions that will return an error if the argument
// that is being check is not correct.
```

```js
exit(fn, type);
// Only takes a single `type` because functions in JavaScript only can return a
// single function.
```

`type.js` exposes several functions that will check a certain value for its
type. The functions will not throw errors themselves, but rather return a `new
Error('...');` that can then be thrown (by `boink.js` or `react` if used as a
`propType`).

```js
// Currently exposed type checkers. Hopefully they are self explanatory.
Type.bool;
Type.string;
Type.number;
Type.array;
Type.object;
Type.int;
Type.arrayOf(type); // E.g., Type.arrayOf(Type.int)
```

## React

The Api here, is meant to be compatible with `PropTypes` from `react`. That
means you can use your custom types both with `boink.js` and `react`.

