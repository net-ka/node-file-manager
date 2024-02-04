import fs from "fs/promises";

export const goUp = () => {
    const currentDir = process.cwd();
    process.chdir('../');
    const newDir = process.cwd();

    if (currentDir === newDir) {
        throw new Error("It's impossible to go up!");
    }
}

export const openDir = async pathData => {
    if (!pathData) {
        throw new Error("Invalid input, provide a path!");
    }

    try {
        process.chdir(`./${pathData}`);
        await fs.stat(process.cwd());
    } catch (err) {
        throw new Error("Such path doesn't exist!");
    }
}

export const list = async () => {
    const path = process.cwd();

    const list = await fs.readdir(path);

    if (!list.length) {
        throw new Error('Empty directory!');
    } else {
        list.sort((a, b) => {
            if (a.toLowerCase() > b.toLowerCase()) {
                return 1;
            }
            if (a.toLowerCase() < b.toLowerCase()) {
                return -1;
            }
            return 0;
        }).sort((a, b) => {
            if (a.split('.').length > 1) {
                return 1;
            }
            if (b.split('.').length > 1) {
                return -1;
            }
            return 0;
        });

        const visualData = list.map(item => ({
            Name: item,
            Type: item.split('.').length > 1 ? 'file' : 'directory',
        }));

        console.table(visualData);
    }
}