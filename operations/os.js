import { EOL, cpus, homedir, userInfo, arch } from 'os';

export const getOsData = arg => {
    if (!arg) {
        throw new Error(`Invalid input, provide OS data you want to know!`);
    }

    switch (arg) {
        case '--EOL': {
            console.log(JSON.stringify(EOL));
            break;
        }
        case '--cpus': {
            const data = cpus();
            console.log(`CPUS number: ${data.length}. Model: ${data[0].model}.`);

            const speedData = data.map(item => ({
                'Clock rate': item.speed / 1000 + 'GHz',
            }));
            console.table(speedData);
            break;
        }
        case '--homedir': {
            console.log(homedir());
            break;
        }
        case '--username': {
            console.log(userInfo().username);
            break;
        }
        case '--architecture': {
            console.log(arch());
            break;
        }
        default: {
            throw new Error(`Invalid input, unknown OS quality!`);
        }
    }
}