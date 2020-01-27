/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import fs from 'fs';

export default class Bnsh {
  // eslint-disable-next-line class-methods-use-this
  async importFiles(sourceDir) {
    fs.readdir(sourceDir, (_err, files) => {
      files.forEach(async file => {
        const module = await import(`.${sourceDir}/${file}`);
        console.log('import ', file, module);
      });
    });
  }

  start() {
    global.suite = (suiteName, func) => {
      console.log('add suite ', suiteName);
      func();
    };
    global.benchmark = benchmarkName => {
      console.log('add benchmark', benchmarkName);
    };
    this.importFiles('./benchmark');
    // TODO
  }
}
