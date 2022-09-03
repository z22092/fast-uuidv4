import uuid from "../build/Release/uuid.node";

type UUIDV4 = string;
interface Fn {
	(): UUIDV4;
}

type UuidV4 = undefined |  Fn;

type All = {
	fast: {
		v4: UuidV4;
	},
	c: {
		v4: UuidV4;
	}
}

const checkLibExist = () => {
	if (!!uuid.uuidV4) {
		return uuid.uuidV4;
	} else if (!!uuid.c) {
		return uuid.c;
	}

	throw new Error("erro to import native file");
};

export const uuidV4: Fn = checkLibExist();


const all: All = {
	fast: {
		v4: uuid.uuidV4 || uuidV4,
	},
	c: {
		v4: uuid.c || uuidV4,
	},
};

export default all;
