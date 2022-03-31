import { existsSync } from 'fs';
import assert from 'assert';
import { resolve } from 'path';
import { createRequire } from "module";

const require = createRequire(import.meta.url);

const initLogger = () => {
  const RED_COLOR = '\x1b[31m';
  const GREEN_COLOR = '\x1b[32m';
  const RESET_COLOR = '\x1b[0m';

  const print = (message, color) => process.stdout.write(`\n${color}*${RESET_COLOR} ${message}`);

  return {
    log: (message) => print(message, RESET_COLOR),
    fail: (message) => print(message, RED_COLOR),
    ok: (message) => print(message, GREEN_COLOR)
  };

};

const logger = initLogger();

const describe = (message, test) => {
  logger.log(message);
  logger.log('=========================================');
  try {
    test();
    logger.ok('pass');
  } catch (e) {
    logger.fail('fail: ' + e.message);
  }
  logger.log('=========================================\n');
};


describe(
  'should throw an error when lib not build',
  () => assert.strictEqual(
    existsSync(resolve('./build/Release/uuid.node')),
    true,
    'it should throw an error if lib not build'
  ));


describe(
  'should throw an error when uuid is not a string',
  () => {
    const { v4 } = require('../build/Release/uuid.node');
    const uuid = v4();

    assert.strictEqual(
      typeof uuid,
      'string',
      'it should throw an error if uuid not a string'
    );
  });

describe(
  'should throw an error when uuid is not valid',
  () => {
    const validationRegex = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
    const { v4 } = require('../build/Release/uuid.node');
    const uuid = v4();
    
    assert.strictEqual(
      validationRegex.test(uuid),
      true,
      'it should throw an error if uuid is not valid'
    );
  });

