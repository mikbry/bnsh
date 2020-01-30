/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export default class {
  constructor(name, opts) {
    this.name = name;
    this.opts = opts;
    this.suites = {};
  }

  getSuite(name) {
    let { suite } = this;
    if (name) {
      suite = this.suites[name];
    }
    if (!suite) {
      suite = {
        name: name || `Benchmark-${Object.keys(this.suites).length + 1}`,
        func: () => {},
      };
      this.suite = suite;
      this.suites[suite.name] = suite;
    }
    return suite;
  }

  addBenchmark(name, func, opts) {
    const suite = this.getSuite();
    let benchmark = suite.benchmarks[name];
    if (!benchmark) {
      benchmark = { name };
      this.suite.benchmarks[name] = benchmark;
    }
    benchmark.func = func;
    benchmark.opts = opts;
    console.log(`[${this.name} provider] addBenchmark "${name}"`);
    return benchmark;
  }

  addSuite(name, func, opts) {
    const suite = this.getSuite(name);
    suite.func = func;
    suite.opts = opts;
    suite.benchmarks = {};
    console.log(`[${this.name} provider] addSuite "${suite.name}"`);
    return suite;
  }

  async run(grep) {
    this.grep = grep || '';
    console.log(`[${this.name} provider] run ${this.grep}`);
    // TODO grep
    Object.keys(this.suites).forEach(async name => {
      const suite = this.suites[name];
      await this.runSuite(suite);
    });
  }

  async runSuite(suite) {
    this.suite = suite;
    // To subclass
  }
}
