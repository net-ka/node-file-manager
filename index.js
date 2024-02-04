import { homedir } from 'os';
import { pipeline } from 'stream/promises'
import {handleOperations} from "./handleOperations.js";
import {exitHandler} from "./utils/index.js";

try {
    process.env.username = process.argv
        .find((item) => item.startsWith('--username')).split('=')[1];

    if (!process.env.username) {
        throw new Error();
    }
} catch (e) {
    console.log('ℹ️Enter your username while starting file manager!');
    process.exit();
}

process.chdir(homedir());
console.log(`🎉Welcome to the File Manager, ${process.env.username}!`);
console.log(`📂You are currently in ${process.cwd()}`);

exitHandler();

await pipeline(
    process.stdin,
    handleOperations,
    process.stdout,
);