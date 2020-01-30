/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import chalk from 'chalk';
import emoji from 'node-emoji';
import minimist from 'minimist';
import Bnsh from './Bnsh';

class BnshCli {
  constructor(args, output, exit) {
    this.output = output;
    this.args = args;
    this.exit = exit;
    this.chalk = chalk;
    this.options = {
      string: ['path', 'grep'],
      boolean: ['help'],
      stopEarly: true,
      alias: {
        p: 'path',
        h: 'help',
        g: 'grep',
      },
      default: {
        path: './benchmark',
        help: false,
      },
    };
  }

  log(text, ...opts) {
    this.output.log(text, ...opts);
  }

  error(text, ...opts) {
    this.output.error(text, ...opts);
  }

  header() {
    // const { version } = getPackage('bnsh');
    const version = '0.1 [WIP]';
    this.log(chalk.bold(emoji.emojify(`Bnsh benchmark your code v${version}`)));
  }

  usage() {
    this.log('Usage: $ bnsh [options]');
  }

  help() {
    this.usage();
    this.log('');
    this.log('Displays help informations.');
    this.log('');
    this.log('Options:');
    this.log('Examples:');
    this.log('$ bnsh');
  }

  async execute() {
    this.hrstart = process.hrtime();
    this.header();
    const args = minimist(this.args, this.options);
    const path = args._[0];
    if (path && path.length > 0) {
      args.path = path;
      args.p = path;
    }
    if (args.help) {
      // Display help
      this.help();
    } else {
      // WIP execute
      const bnsh = new Bnsh({ path: args.path });
      await bnsh.start();
    }
  }
}
/* istanbul ignore next */
const start = async (output = console) => {
  const version = process.versions.node;
  const major = parseInt(version.split('.')[0], 10);

  if (major < 10) {
    output.error(`Node version ${version} is not supported, please use Node.js 10.0 or higher.`);
    process.exit(1);
  }

  // Grab arguments
  const [, , ...args] = process.argv;
  const cli = new BnshCli(args, output, process.exit);
  await cli.execute();
  return cli;
};
export { BnshCli };
export default start;
