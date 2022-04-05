const https = require('https');
const http = require('http');
const { tmpdir } = require('os');
const { join } = require('path');
const { spawn } = require("child_process");
const { existsSync, createWriteStream } = require('fs');

const isWindows = (process.platform.indexOf('win') === 0);

if (!isWindows) {
	console.log('is not windows');
	process.exit();
}

const getHttp = {
	'https:': https,
	'http:': http
};

const command = [
	'--quiet',
	'--norestart',
	'--add', 'Microsoft.VisualStudio.Component.VC.Tools.x86.x64',
	'--add', 'Microsoft.VisualStudio.ComponentGroup.NativeDesktop.Core',
	'--add', 'Microsoft.VisualStudio.ComponentGroup.NativeDesktop.Llvm.Clang',
	'--includeRecommended',
	'--installWhileDownloading'
];


const sku = 'community';
const channel = 'Release';
const version = 'VS' + (process.env.MSVS_VERSION || '2021');
const filename = + Date.now() + '-VisualStudioSetup.exe';

const url = new URL('https://c2rsetup.officeapps.live.com/c2r/downloadVS.aspx');

url.search = new URLSearchParams({
	sku,
	channel,
	version
});

const httpLib = getHttp[url.protocol];

const download = (url, filename) => {
	const file = createWriteStream(join(tmpdir(), filename));
	return new Promise((resolve, reject) => {
		httpLib.get(url, (response) => {
			response.pipe(file);
			file.on("finish", () => {
				file.close();
				resolve(file);
			});
		});
	});
};

const timeoutError = (reject) => {
	return setTimeout(() => reject(new Error('installation timeout')), 1000 * 60 * 10).unref();
};

const spawnProcess = (filePath) => {
	return new Promise((resolve, reject) => {
		let timeout = false;
		const renewTimeout = () => {
			if (timeout) clearTimeout(timeout);
			timeout = timeoutError(reject);
		};

		const pss = spawn(filePath, command);

		pss.stdout.on("data", data => {
			console.log(`stdout: ${data}`);
			renewTimeout();
		});

		pss.stderr.on("data", data => {
			console.log(`stderr: ${data}`);
			renewTimeout();
		});

		pss.on('error', (error) => {
			console.log(`error: ${error.message}`);
			reject(error);
		});

		pss.on("close", code => {
			console.log(`child process exited with code ${code}`);
			resolve(true);
		});

	});
};

(async () => {
	try {
		const file = await download(url, filename);
		if (existsSync(file.path)) {
			const success = await spawnProcess(file.path);
			if (success) {
				process.exit();
			}
			throw new Error('error to install visual studio');
		} else {
			throw new Error('error to download visual studio');
		}
	} catch (e) {
		console.error(e);
		process.exit(1);
	}
})();

