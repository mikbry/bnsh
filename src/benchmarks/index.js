/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Benchmarkjs from './benchmarkjs';

// TODO load different engines
const builder = (name, opts) => new Benchmarkjs(opts);

export default builder;
