/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Benchmarkjs from './benchmarkjs';

// TODO load different providers using name
const factory = (name, opts) => new Benchmarkjs(name, opts);

export default factory;
