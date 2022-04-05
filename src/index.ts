import uuid from "../build/Release/uuid.node";

const checkLibExist = () => {
	if (!!uuid.uuidV4) {
		return uuid.uuidV4;
	} else if (!!uuid.c) {
		return uuid.c;
	}

	throw new Error("erro to import native file");
};

export const uuidV4 = checkLibExist();

const all = {
	fast: {
		v4: uuid.uuidV4 || uuidV4,
	},
	c: {
		v4: uuid.c || uuidV4,
	},
};

export default all;
