'use strict';

const chalk = require('chalk');

const { v4 } = require('uuid');
const { randomFillSync } = require('crypto');
const { uuidV4 } = require('../build/Release/uuid.node');

class UUID {
  static #byteToHex = Array.from({ length: 256 }, (_, i) => (i + 0x100).toString(16).substr(1));
  static #random8Pool = new Uint8Array(256);
  static #poolLength = UUID.#random8Pool.length;
  static #generateRandom() {
    if (UUID.#poolLength > UUID.#random8Pool.length - 16) {
      randomFillSync(UUID.#random8Pool);
      UUID.#poolLength = 0;
    }
    return UUID.#random8Pool.slice(UUID.#poolLength, UUID.#poolLength += 16);
  }

  static #stringify(arr, offset = 0) {
    return (
      UUID.#byteToHex[arr[offset + 0]] +
      UUID.#byteToHex[arr[offset + 1]] +
      UUID.#byteToHex[arr[offset + 2]] +
      UUID.#byteToHex[arr[offset + 3]] + '-' +
      UUID.#byteToHex[arr[offset + 4]] +
      UUID.#byteToHex[arr[offset + 5]] + '-' +
      UUID.#byteToHex[arr[offset + 6]] +
      UUID.#byteToHex[arr[offset + 7]] + '-' +
      UUID.#byteToHex[arr[offset + 8]] +
      UUID.#byteToHex[arr[offset + 9]] + '-' +
      UUID.#byteToHex[arr[offset + 10]] +
      UUID.#byteToHex[arr[offset + 11]] +
      UUID.#byteToHex[arr[offset + 12]] +
      UUID.#byteToHex[arr[offset + 13]] +
      UUID.#byteToHex[arr[offset + 14]] +
      UUID.#byteToHex[arr[offset + 15]]
    );
  }
  static v4() {
    const random = UUID.#generateRandom();
    random[6] = random[6] & 0x0f | 0x40;
    random[8] = random[8] & 0x3f | 0x80;
    return UUID.#stringify(random);
  }
}

const U = 100000000;
console.log('\n' + '='.repeat(50) + '\n');
console.log(chalk.bgBlueBright('benchmarks test:' + U + ' UUIDs' ))
console.log('\n' + '='.repeat(50) + '\n');
// using crypto
{
  const m = chalk.red("node js using crypto");
  console.time(m);
  for (let i = 0; i < U; i++) UUID.v4();
  console.timeEnd(m);
}
console.log('\n' + '='.repeat(50) + '\n');
// using using lib
{
  const m = chalk.red("uuid lib");
  console.time(m);
  for (let i = 0; i < U; i++) v4();
  console.timeEnd(m);
}
console.log('\n' + '='.repeat(50) + '\n');
// using using c++
{
  const m = chalk.red("c++ lib");
  console.time(m);
  for (let i = 0; i < U; i++) uuidV4();
  console.timeEnd(m);
}
console.log('\n' + '='.repeat(50));