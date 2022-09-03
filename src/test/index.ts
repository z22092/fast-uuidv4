import assert from "assert";
import { UuidV4 } from "../";

enum COLORS {
	RED_COLOR = "\x1b[31m",
	GREEN_COLOR = "\x1b[32m",
	RESET_COLOR = "\x1b[0m",
}

const initLogger = () => {
	const print = (message: string, color: COLORS) =>
		process.stdout.write(`\n${color}*${COLORS.RESET_COLOR} ${message}`);

	return {
		log: (message: string) => print(message, COLORS.RESET_COLOR),
		fail: (message: string) => print(message, COLORS.RED_COLOR),
		ok: (message: string) => print(message, COLORS.GREEN_COLOR),
	};
};

const logger = initLogger();

const describe = (message: string, test: () => void) => {
	logger.log(message);
	logger.log("=========================================");
	try {
		test();
		logger.ok("pass");
	} catch (e) {
		logger.fail("fail: " + (e as Error).message);
	}
	logger.log("=========================================\n");
};

describe("should throw an error when uuid is not a string", () => {
	assert.strictEqual(
		typeof uuidV4(),
		"string",
		"it should throw an error if uuid not a string"
	);
});

describe("should throw an error when uuid is not valid", () => {
	const validationRegex =
		/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
	assert.strictEqual(
		validationRegex.test(uuidV4()),
		true,
		"it should throw an error if uuid is not valid"
	);
});
