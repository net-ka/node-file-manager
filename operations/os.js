import { EOL, cpus } from 'os';

export const getOsData = arg => {
    if (!arg) {
        throw new Error(`Invalid input, provide OS data you want to show!`);
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
        }
    }
}