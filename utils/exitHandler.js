import readline from 'node:readline';

export const exitHandler = () => {
    if (process.platform === "win32") {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.on("SIGINT", () => {
            process.emit("SIGINT");
        });
    }

    ['exit', 'close', 'SIGINT']
        .forEach(item => process.on(item, () => {
            if (item === 'SIGINT') {
                process.exit();
            }
            console.log(`👋Thank you for using File Manager, ${process.env.username}, goodbye!`);
        }));
}