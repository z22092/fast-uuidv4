'use strict';

const { strictEqual } = require('assert');
const { dirname, join } = require('path');


// define folder path to save chart
const DIR_NAME = dirname(__filename);
const RESULT_FOLDER_NAME = 'result';
const RESULT_PATH = join(DIR_NAME, RESULT_FOLDER_NAME);
const RESULT_FILE_FORMAT = 'chart.html';
const RESULT_FILE_NAME = 'UUID';


// import benchmark suit
const { suite, add, cycle, complete, save } = require('benny');


// validate uuid
const validationRegex = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

// validate ?
const VALIDATE = true;


const { randomUUID } = require('crypto');
const { v4: uuidJsLibV4 } = require('uuid');
const { v4: uuidV4RandomFillSync } = require('./uuidV4RandomFillSync');

let fast, c;

try {
	const { default: fastUuidv4 } = require('../dist');
	fast = fastUuidv4.fast.v4;
	c = fastUuidv4.c.v4;
} catch (e) {
	console.error(e);
	console.log('error to import fastUuidv4 lib');
	process.exit(1);
}

const handler = (fn) => {

	if (VALIDATE)
		return () => strictEqual(
			validationRegex.test(fn()),
			true,
			'it should throw an error if uuid is not valid'
		);

	return () => fn();
};

const fns = new Map([
	['crypto randomFillSync', uuidV4RandomFillSync],
	['crypto randomUUID', randomUUID],
	['js lib uuid', uuidJsLibV4],
	['fast-uuidv4 using default', fast],
	['fast-uuidv4 using C', c],
]);

const testName = 'UUID GEN';
const saveOptions = { file: RESULT_FILE_NAME, format: RESULT_FILE_FORMAT, folder: RESULT_PATH, details: true };

suite(testName,
	...[...fns.entries()].filter(([_, value]) => !!value).map(([key, value]) => add(key, handler(value))),
	cycle(),
	complete(),
	save(saveOptions)
);
