declare module "*/uuid.node" {
	type UUID = string;
	const fn: () => string;
	export const uuidV4: undefined | typeof fn;
	export const c: undefined | typeof fn;
}

