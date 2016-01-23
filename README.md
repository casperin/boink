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

# BOINK

Pragmatic custom "type checking".

The module consists of two separate parts: `boink.js` and `type.js` with no
connection between them.

It is built to being opened up and edited to your needs. For instance, at the
top of `boink.js`, there's an `ACTIVE` constant, that probably (for performance
reasons) should be set to false in production.

In `boink.js` you will find `enter`, `exit`, and `boink` which are both function
wrappers, checking the types of the applied function's entrance (`enter`) and
exit (`exit`) variabels. `boink` checks both.

## Usage

```js
let add = (x, y) => x + y;
add = enter(int, int)(add);
// `add` is now a function that checks if it has two arguments (when called)
// that are both `int`.

let sub = (x, y) => x - y;
sub = exit(int)(sub);
// `sub` is now a function that checks if its return value is indeed (as
// promised), an `int`.

let mul = (x, y) => x * y;
add = boink(int, int)(int)(add);
// `mul` is now a function that checks that both its arguments are `int`, and
// that its return value is also an `int`.
```

If a contract is not honored, by default boink throws an error; but check
`boink.js` for more options.

```js
import {enter} from './boink';
import Type from './type';

hasLength = enter(Type.int, Type.string)(hasLength);
function hasLength (n, str) {
  return str.length === n;
}

// All good, we get our value (true)
hasLength(3, 'foo');

// Not so good. This will throw an error
hasLength(3.5, 'foo');
```

### Custom types

I mostly use custom types personally.

```js
/**
 * customTypes.js
 */
export const PersonType = x => {
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
import {PersonType} from './customTypes';

// Applying
hasAge = enter(int, TypePerson)(hasAge);
hasAge = exit(bool)(hasAge);
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
enter(type1, type2, ...)(fn);
// `types` here, refers to functions that will return an error if the argument
// that is being check is not correct.
```

```js
exit(type)(fn);
// Only takes a single `type` because functions in JavaScript only can return a
// single function.
```

`type.js` exposes several functions that will check a certain value for its
type. The functions will not throw errors themselves, but rather return a `new
Error('...');` that can then be thrown (by `boink.js` or `react` if used as a
`propType`).

```js
// Currently exposed type checkers. Hopefully they are self explanatory.
Type.bool
Type.string
Type.number
Type.array
Type.object
Type.int
Type.arrayOf(type) // E.g., Type.arrayOf(Type.int)
```


## React

The Api here, is meant to be compatible with `PropTypes` from `react`. That
means you can use your custom types both with `boink.js` and `react`.


## Installation

You might actually not want to use `npm` for this. If you are using `babel` with
the `es2015` preset, then just `git clone` the project somewhere in your `src`
directory (or wherever) and edit and import the files as you need them.

```
git clone https://github.com/casperin/boink.git
```


## Test

```
npm test
```

This should do it for you. Notice, that though `boink.js` itself is not
dependent on other modules/libraries, the tests are. Make sure you ran `npm
install` before `npm test`.


## License

MIT of course.
