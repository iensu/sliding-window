# Sliding Window

A NodeJS module providing a sliding window function for arrays.

This can be useful when for instance implementing a image slideshow and you only want to
load a say three images at a time.

## Installation

### NPM

```
npm install --save window-slider
```

### Bower

```
bower install --save window-slider
```

## Examples

### In NodeJS

```javascript
const windowSlider = require('window-slider');

const window = windowSlider([1, 2, 3, 4]);

// Default window size is 3 items
// and start index is 0
console.log(window.current())  // [1, 2, 3]

// You can move the window right
console.log(window.right())    // [2, 3, 4]
console.log(window.right())    // [3, 4, 1]

// You can reset the window
window.reset();
console.log(window.current())  // [1, 2, 3]

// And you can move the window left
console.log(window.left())     // [4, 1, 2]
console.log(window.left())     // [3, 4, 1]

// You can retrieve a copy of the original array
console.log(window.array())    // [1, 2, 3, 4, 5]

// You can also specify the window size and start index
const window2 = windowSlider([1, 2, 3, 4], { startIndex: 1, windowSize: 2 });

console.log(window2.current()) // [2, 3]
```

### In the Browser

```javascript
// The module is exported as `WindowSlider` and works
// as in the Node example above.

var win = WindowSlider([1, 2, 3, 4]);

console.log(win.current())     // [1, 2, 3]
console.log(window.right())    // [2, 3, 4]
console.log(window.right())    // [3, 4, 1]

// etc...
```

See tests for more elaborate examples.
