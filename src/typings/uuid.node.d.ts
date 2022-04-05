declare module "*/uuid.node" {
	function fn(): string;

	export const uuidV4: undefined | typeof fn;
	export const c: undefined | typeof fn;
}
