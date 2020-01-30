/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Abstract from './abstract';

export default class extends Abstract {
  addBenchmark(name, func, opts) {
    const benchmark = super.addBenchmark(name, func, opts);
    // TODO handle async func
    this.suite.provider.add(benchmark.name, benchmark.func);
    return benchmark;
  }

  addSuite(name, func, opts) {
    const suite = super.addSuite(name, func, opts);
    // eslint-disable-next-line global-require
    const Benchmark = require('benchmark');
    suite.provider = new Benchmark.Suite(suite.name);
    return suite;
  }

  // eslint-disable-next-line class-methods-use-this
  runSuite(suite) {
    // TODO use a reporter
    suite.provider
      .on('cycle', event => {
        console.log(String(event.target));
      })
      .on('complete', () => {
        const fastest = suite.provider.filter('fastest');
        console.log(`Fastest is ${fastest.map('name')}`);
      })
      // run async
      .run({ async: true });
    // To subclass
  }
}
