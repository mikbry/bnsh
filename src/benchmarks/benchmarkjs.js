/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Benchmark from 'benchmark';

export default class {
  constructor(opts) {
    this.opts = opts;
    this.benches = {};
  }

  addBenchmark(name, func) {
    this.benches[name] = new Benchmark();
    func();
  }

  addSuite(benchname, name, func) {
    // TODO
    const benchmark = this.benches[benchname];
    benchmark.suite[name] = func;
  }

  run(grep) {
    this.grep = grep;
    // TODO
  }
}
