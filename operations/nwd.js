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
        const visualData = list.map(item => ({
            Name: item,
            Type: item.startsWith('.') ? 'file' : 'directory',
        }))
        console.table(visualData);
    }
}