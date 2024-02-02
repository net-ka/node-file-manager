import {Transform} from "stream";
import {goUp, openDir} from "./operations/index.js";

export const handleOperations = new Transform({
    async transform(chunk, encoding, callback) {
        const [operation, ...args] = chunk
            .toString()
            .replace(/\s+/g, ' ')
            .trim()
            .split(' ');

        try {
            switch (operation) {
                case 'up': {
                    goUp();
                    break;
                }
                case 'cd': {
                    await openDir(args);
                    break;
                }
            }
        } catch (err) {
            console.log(`Operation ${operation} failed. ${err.message}`);
        }

        console.log(`You are currently in ${process.cwd()}`);
        callback();
    },
});