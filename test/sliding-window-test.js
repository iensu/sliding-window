'use strict';

require('chai').should();

const slidingWindow = require('../sliding-window.js');

describe('Sliding Window', () => {

  it('should have a default window size of 3 with 0 as the default start index', () => {
    const window = slidingWindow([1, 2, 3, 4, 5]);
    window.current().should.be.an('array').with.length(3);
  });

  it('should start the window at the start index if provided', () => {
    const window = slidingWindow([1, 2, 3, 4], { startIndex: 1 });
    window.current().should.eql([2, 3, 4]);
  });

  it('should have a window of the provided size', () => {
    const window = slidingWindow([1, 2, 3, 4], { windowSize: 2 });
    window.current().should.eql([1, 2]);
  });

  it('should return the first window upon a left followed by a right', () => {
    const window = slidingWindow([1, 2, 3, 4]);
    const firstWindow = [1, 2, 3];

    window.current().should.eql(firstWindow);
    window.left().should.eql([4, 1, 2]);
    window.right().should.eql(firstWindow);
  });

  it('should return the first window upon a right followed by a left', () => {
    const window = slidingWindow([1, 2, 3, 4]);
    const firstWindow = [1, 2, 3];

    window.current().should.eql(firstWindow);
    window.right().should.eql([2, 3, 4]);
    window.left().should.eql(firstWindow);
  });

  describe('current', () => {

    it('should return an empty list if initialized with an empty list', () => {
      const window = slidingWindow([]);
      window.current().should.be.an('array').with.length(0);
    });

    it('should return an array of windowSize size', () => {
      let window;

      window = slidingWindow([1, 2, 3], { windowSize: 1 });
      window.current().should.be.an('array').with.length(1);

      window = slidingWindow([1, 2, 3], { windowSize: 2 });
      window.current().should.be.an('array').with.length(2);
    });

    it('should repeatedly return the same window', () => {
      const window = slidingWindow([1, 2, 3], { windowSize: 2 });

      const first = window.current();
      window.current().should.eql(first);
      window.current().should.eql(first);
      window.current().should.eql(first);
    });

    it('should wrap around if window size is greater than provided list', () => {
      const window = slidingWindow([1, 2]);
      window.current().should.eql([1, 2, 1]);
    });

    it('should wrap around multiple times if necessary', () => {
      const window = slidingWindow([1, 2, 3], { windowSize: 9 });
      window.current().should.eql([1, 2, 3, 1, 2, 3, 1, 2, 3]);
    });

  });

  describe('right', () => {

    it('should return an empty list if initialized with an empty list', () => {
      const window = slidingWindow([]);
      window.right().should.be.an('array').with.length(0);
    });

    it('should return an array of windowSize size', () => {
      let window;

      window = slidingWindow([1, 2, 3], { windowSize: 1 });
      window.right().should.be.an('array').with.length(1);

      window = slidingWindow([1, 2, 3], { windowSize: 2 });
      window.right().should.be.an('array').with.length(2);
    });

    it('should move the window to the right by one', () => {
      const window = slidingWindow([1, 2, 3, 4]);
      window.current().should.eql([1, 2, 3]);
      window.right().should.eql([2, 3, 4]);
    });

    it('should wrap around to the beginning of the list if window reaches the end', () => {
      const window = slidingWindow([1, 2, 3, 4]);
      window.right().should.eql([2, 3, 4]);
      window.right().should.eql([3, 4, 1]);
    });

    it('should wrap multiple times if necessary', () => {
      let window = slidingWindow([1, 2, 3], { windowSize: 9 });
      window.right().should.eql([2, 3, 1, 2, 3, 1, 2, 3, 1]);
      window.right().should.eql([3, 1, 2, 3, 1, 2, 3, 1, 2]);
    });
  });

  describe('left', () => {

    it('should return an empty list if initialized with an empty list', () => {
      const window = slidingWindow([]);
      window.left().should.be.an('array').with.length(0);
    });

    it('should return an array of windowSize size', () => {
      let window;

      window = slidingWindow([1, 2, 3], { windowSize: 1 });
      window.left().should.be.an('array').with.length(1);

      window = slidingWindow([1, 2, 3], { windowSize: 2 });
      window.left().should.be.an('array').with.length(2);
    });

    it('should move the window to the left by one', () => {
      const window = slidingWindow([1, 2, 3, 4]);
      window.current().should.eql([1, 2, 3]);
      window.left().should.eql([4, 1, 2]);
    });

    it('should wrap multiple times if necessary', () => {
      let window = slidingWindow([1, 2, 3], { windowSize: 9 });
      window.left().should.eql([3, 1, 2, 3, 1, 2, 3, 1, 2]);
      window.left().should.eql([2, 3, 1, 2, 3, 1, 2, 3, 1]);
    });
  });

  describe('reset', () => {

    it('should set the window back to its original position', () => {
      const window = slidingWindow([1, 2, 3, 4]);
      const originalWindow = window.current();

      window.right().should.not.eql(originalWindow);
      window.right().should.not.eql(originalWindow);

      window.reset();
      window.current().should.eql(originalWindow);
    });

    it('should reset to the provided start index', () => {
      const window = slidingWindow([1, 2, 3, 4], { startIndex: 2 });
      const originalWindow = window.current();

      originalWindow.should.eql([3, 4, 1]);

      window.right().should.not.eql(originalWindow);
      window.right().should.not.eql(originalWindow);

      window.reset();
      window.current().should.eql(originalWindow);
    });

  });

  describe('array', () => {

    it('should return a copy of the original array', () => {
      const originalArray = [1, 2, 3, 4, 5];
      const window = slidingWindow(originalArray);

      window.array().should.eql(originalArray);
      window.array().should.not.equal(originalArray); // is a copy
    });
  });

});
