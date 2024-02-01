import { homedir } from "os";

try {
    process.env.username = process.argv
        .find((item) => item.startsWith("--username")).split('=')[1];

    if (!process.env.username) {
        throw new Error();
    }
} catch (e) {
    console.log("Enter your username during file manager start!");
    process.exit();
}

console.log(`Welcome to the File Manager, ${process.env.username}!`);

process.chdir(homedir());
console.log(`You are currently in ${process.cwd()}`);

['exit', 'close']
    .forEach(item => process.on(item, () => {
        console.log(`Thank you for using File Manager, ${process.env.username}, goodbye!!`);
        process.exit();
    }));