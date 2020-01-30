/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import fs from 'fs';
import providersFactory from './providers';

const fsp = fs.promises;

export default class Bnsh {
  constructor(opts) {
    // TODO remove this hard coding;
    this.opts = {
      provider: 'benchmarkjs',
      ...opts,
    };
    this.provider = providersFactory(this.opts.provider);
  }

  // eslint-disable-next-line class-methods-use-this
  async importFiles(sourceDir) {
    const files = await fsp.readdir(sourceDir);
    files.forEach(async file => {
      console.log('import ', file);
      await import(`.${sourceDir}/${file}`);
    });
  }

  async start() {
    global.suite = (name, func, opts) => {
      console.log(`add suite "${name}"`);
      const suite = this.provider.addSuite(name, func, opts);
      suite.func();
    };
    global.benchmark = (name, func, opts) => {
      console.log(`add benchmark "${name}"`);
      this.provider.addBenchmark(name, func, opts);
    };
    await this.importFiles(this.opts.path);
    // TODO
    await this.provider.run();
  }
}
