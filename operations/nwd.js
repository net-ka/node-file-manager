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