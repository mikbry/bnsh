/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// TODO
console.log('index.bench.js : [TODO] import');

suite('Finding a substring', () => {
  benchmark('RegExp#test', () => /o/.test('Hello World!'));

  benchmark('String#indexOf', () => 'Hello World!'.indexOf('o') > -1);

  benchmark('String#match', () => !!'Hello World!'.match(/o/));
});
