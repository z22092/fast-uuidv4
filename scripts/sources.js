const { resolve, relative, dirname, join, sep, posix } = require('path');
const { readdir } = require('fs');
const { promisify } = require('util');
const readdirAsync = promisify(readdir);


const DIR_NAME = resolve(dirname(__filename), '..');
const IS_LINUX = process.platform === 'linux';
const ONLY_LINUX = process.env.ONLY_LINUX || false;


const SOURCE_PATH = (() => {
	if (ONLY_LINUX) {
		return join('lib', 'linux');
	} else if (IS_LINUX) {
		return 'lib';
	}
	return join('lib', 'others');
})();

const PATH = join(DIR_NAME, SOURCE_PATH);

async function getFiles(dir) {
	const dirents = await readdirAsync(dir, { withFileTypes: true });
	const files = await Promise.all(
		dirents.map(dirent => {
			const res = resolve(dir, dirent.name);
			return dirent.isDirectory() ? getFiles(res) : res;
		}),
	);
	return Array.prototype.concat(...files);
}

(async () => {
	const files = (await getFiles(resolve(PATH)))
		.filter(
			v =>
				// v.endsWith('.cpp') ||
				v.endsWith('.h') ||
				// v.endsWith('.hpp') ||
				v.endsWith('.c'),
		)
		.map(v => relative(PATH, v))
		.map(v => join(SOURCE_PATH, v))
		.map(v => v.split(sep).join(posix.sep));


	if (ONLY_LINUX) {
		files.push('lib/linux/uuid.cc');
	} else if (IS_LINUX) {
		files.push('lib/all/uuid.cc');
	} else {
		files.push('lib/others/uuid.cc');
	}

	process.stdout.write(files.join(' '));
	return files;
})();
