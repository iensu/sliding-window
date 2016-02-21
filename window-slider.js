(function () {
  'use strict';

  function windowGetter(xs, windowSize) {
    return (startIdx) => {
      if (xs.length === 0) return [];

      var window = [];
      for (let i = startIdx; i < (startIdx + windowSize); i++) {
        window.push(xs[i % xs.length]);
      }
      return window;
    };
  }

  var windowSlider = function windowSlider(xs, options) {
    options = options || {};

    var api = {},
        windowSize = Math.abs(options.windowSize) || 3,
        getWindow = windowGetter([].slice.call(xs),
                                 windowSize);

    var currentIndex = Math.abs(options.startIndex) || 0;

    api.current = function () {
      return getWindow(currentIndex);
    };

    api.left = function () {
      currentIndex = (currentIndex || xs.length) - 1;
      return getWindow(currentIndex);
    };

    api.right = function () {
      currentIndex = (currentIndex + 1) % xs.length;
      return getWindow(currentIndex);
    };

    api.reset = function () {
      currentIndex = Math.abs(options.startIndex) || 0;
    };

    api.array = function () {
      return [].slice.call(xs);
    };

    return api;
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = windowSlider;
  } else {
    window.WindowSlider = windowSlider;
  }

})();
