import {Transform} from "stream";
import {
    goUp,
    openDir,
    list,
    cat,
    add,
} from "./operations/index.js";

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
                    try {
                        await openDir(...args);
                    } catch (e) {
                        throw new Error(e);
                    }

                    break;
                }
                case 'ls': {
                    try {
                        await list();
                    } catch (e) {
                        throw new Error(e);
                    }

                    break;
                }
                case 'cat': {
                    try {
                        await cat(...args);
                    } catch (e) {
                        throw new Error(e);
                    }

                    break;
                }
                case 'add': {
                    try {
                        await add(...args);
                    } catch (e) {
                        throw new Error(e);
                    }

                    break;
                }
                default:
                    console.log(`The operation "${operation}" is unknown!`);
            }
        } catch (err) {
            console.log(`Operation ${operation} failed. ${err.message}`);
        }

        console.log(`You are currently in ${process.cwd()}`);
        callback();
    },
});