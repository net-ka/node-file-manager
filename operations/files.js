import fs, { promises as fsPromises } from 'fs';
import { basename, join } from 'path';
import {getPath, isPathExist} from "../utils/index.js";

export const cat = async pathData => {
    return new Promise(async (resolve, reject) => {
        if (!pathData) {
            reject('Invalid input, provide a path!');
            return;
        }

        const path = getPath(pathData);

        try {
            const isFile = (await fsPromises.lstat(path)).isFile();

            if (isFile) {
                const readableSrc = fs.createReadStream(path);

                readableSrc.on('data', chunk => {
                    console.log(chunk.toString());
                    resolve();
                });

                readableSrc.on('error', (e) => {
                    reject(e);
                });
            } else {
                reject('This is not a file!');
            }

        } catch (e) {
            reject(e);
        }
    });
}

export const add = async (fileName) => {
    if (!fileName) {
        throw new Error(`Invalid input, provide a name for a file!`);
    }

    const currentDir = process.cwd();

    try {
        await fsPromises.writeFile(`${currentDir}/${fileName}`, '', { flag: 'wx'});
        console.log(`✅ File ${fileName} was created successfully!`)
    } catch (e) {
        throw new Error(e);
    }
}

export const rename = async (fileOldPath, fileNewName) => {
    if (!fileOldPath || !fileNewName) {
        throw new Error(`Invalid input, provide a path and a new name for a file!`);
    }

    const fileOldName = basename(fileOldPath);
    const currentPath = getPath(fileOldPath);
    const destinationPath = getPath(fileOldPath.replace(fileOldName, fileNewName));

    const isDestinationPathExist = await isPathExist(destinationPath);

    if (isDestinationPathExist) {
        throw new Error('A file with this name already exists!');
    } else {
        try {
            await fsPromises.rename(currentPath, destinationPath);
            console.log(`✅ File ${fileOldName} was successfully renamed with ${fileNewName}`);
        } catch (e) {
            throw new Error(e);
        }
    }
}

export const copy = async (fileCurrentPath, pathToNewDirectory) => {
    return new Promise(async (resolve, reject) => {
        if (!fileCurrentPath || !pathToNewDirectory) {
            reject(`Invalid input, provide a current path of entity and a copy path for it!`);
            return;
        }

        const fileName = basename(fileCurrentPath);
        const destinationFilePath = join(pathToNewDirectory, fileName);

        const isDestinationFilePathExist = await isPathExist(destinationFilePath);

        if (isDestinationFilePathExist) {
            reject('Impossible to copy, such file already exists in a given directory!');
        } else {
            const readStream = fs.createReadStream(getPath(fileCurrentPath));
            const writeStream = fs.createWriteStream(getPath(destinationFilePath));

            const copyStream = readStream.pipe(writeStream);

            readStream.on('error', (e) =>
                reject(e)
            );
            copyStream.on('error', (e) =>
                reject(e)
            );

            copyStream.on('finish', () => {
                console.log(`✅ File ${fileName} was copied successfully!`);
                resolve();
            });
        }
    });
}

export const move = async (fileCurrentPath, pathToNewDirectory) => {
    return new Promise(async (resolve, reject) => {
        if (!fileCurrentPath || !pathToNewDirectory) {
            reject(`Invalid input, provide a current path of entity and a move path for it!`);
            return;
        }

        const fileName = basename(fileCurrentPath);
        const destinationFilePath = join(pathToNewDirectory, fileName);

        const isDestinationFilePathExist = await isPathExist(destinationFilePath);

        if (isDestinationFilePathExist) {
            reject('Impossible to move, such file already exists in a given directory!');
        } else {
            const readStream = fs.createReadStream(getPath(fileCurrentPath));
            const writeStream = fs.createWriteStream(getPath(destinationFilePath));

            const copyStream = readStream.pipe(writeStream);

            readStream.on('error', (e) =>
                reject(e)
            );
            copyStream.on('error', (e) =>
                reject(e)
            );

            copyStream.on('finish', async () => {
                try {
                    await fsPromises.unlink(getPath(fileCurrentPath));
                    console.log(`✅ File ${fileName} was moved successfully!`);
                    resolve();
                } catch (e) {
                    reject(e)
                }
            });
        }
    });
}

export const remove = async path => {
    if (!path) {
        throw new Error(`Invalid input, provide a path for remove!`);
    }

    try {
        const currentPath = getPath(path);
        await fsPromises.unlink(currentPath);
        const fileName = basename(currentPath);
        console.log(`✅ File ${fileName} was removed successfully!`);
    } catch (e) {
        throw new Error(e);
    }
}