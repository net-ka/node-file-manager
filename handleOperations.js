import {Transform} from "stream";
import {
    goUp,
    openDir,
    list,
    cat,
    add,
    rename,
    copy,
    move,
    remove,
    getOsData,
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
                case 'rn': {
                    try {
                        await rename(...args);
                    } catch (e) {
                        throw new Error(e);
                    }

                    break;
                }
                case 'cp': {
                    try {
                        await copy(...args);
                    } catch (e) {
                        throw new Error(e);
                    }

                    break;
                }
                case 'mv': {
                    try {
                        await move(...args);
                    } catch (e) {
                        throw new Error(e);
                    }

                    break;
                }

                case 'rm': {
                    try {
                        await remove(...args);
                    } catch (e) {
                        throw new Error(e);
                    }

                    break;
                }
                case 'os': {
                    getOsData(...args);
                    break;
                }
                case '.exit':
                    process.exit();
                    break;
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