"use strict";

function slidingWindow(xs, options) {
  options = options || {};

  const api = {},
        windowSize = Math.abs(options.windowSize) || 3,
        getWindow = windowGetter([].slice.call(xs),
                                 windowSize);

  let currentIndex = Math.abs(options.startIndex) || 0;

  api.current = () => getWindow(currentIndex);

  api.left = () => {
    currentIndex = (currentIndex || xs.length) - 1;
    return getWindow(currentIndex);
  };

  api.right = () => {
    currentIndex = (currentIndex + 1) % xs.length;
    return getWindow(currentIndex);
  };

  api.reset = () => {
    currentIndex = Math.abs(options.startIndex) || 0;
  };

  api.array = () => [].slice.call(xs);

  return api;
}

function windowGetter(xs, windowSize) {
  return (startIdx) => {
    if (xs.length === 0) return [];

    const window = [];
    for (let i = startIdx; i < (startIdx + windowSize); i++) {
      window.push(xs[i % xs.length]);
    }
    return window;
  };
}

module.exports = slidingWindow;
