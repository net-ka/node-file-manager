import { homedir } from 'os';
import { pipeline } from 'stream/promises'
import {handleOperations} from "./handleOperations.js";

try {
    process.env.username = process.argv
        .find((item) => item.startsWith('--username')).split('=')[1];

    if (!process.env.username) {
        throw new Error();
    }
} catch (e) {
    console.log('Enter your username during file manager start!');
    process.exit();
}

console.log(`Welcome to the File Manager, ${process.env.username}!`);

await pipeline(
    process.stdin,
    handleOperations,
    process.stdout,
)


process.chdir(homedir());
console.log(`You are currently in ${process.cwd()}`);

['exit', 'close']
    .forEach(item => process.on(item, () => {
        console.log(`Thank you for using File Manager, ${process.env.username}, goodbye!!`);
        process.exit();
    }));