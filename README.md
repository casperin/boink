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

Pragmatic custom "types" to js.

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


