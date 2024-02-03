import fs, { promises as fsPromises } from 'fs';
import { basename, join } from 'path';
import {getPath, isPathExist} from "../utils/index.js";

export const cat = async pathData => {
    return new Promise(async (resolve, reject) => {
        const path = getPath(pathData);

        try {
            const isFile = (await fsPromises.lstat(path)).isFile();

            if (isFile) {
                const readableSrc = fs.createReadStream(path);

                readableSrc.on('data', chunk => {
                    console.log(chunk.toString());
                    resolve();
                });

                readableSrc.on('error', () => {
                    reject('Reading failed!');
                });
            } else {
                reject('This is not a file!');
            }

        } catch (err) {
            reject(err.message);
        }
    });
}

export const add = async (fileName) => {
    if (!fileName) {
        throw new Error(`Provide a name for a file!`);
    }

    const currentDir = process.cwd();

    try {
        await fsPromises.writeFile(`${currentDir}/${fileName}`, '', { flag: 'wx'});
        console.log(`File ${fileName} was created successfully!`)
    } catch (err) {
        throw new Error(`Impossible to create file ${fileName}`);
    }
}

export const rename = async (fileOldPath, fileNewName) => {
    if (!fileOldPath || !fileNewName) {
        throw new Error(`Provide a path and a new name for a file!`);
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
            console.log(`File ${fileOldName} was successfully renamed with ${fileNewName}`);
        } catch (err) {
            throw new Error('Renaming was not successful, check a path and a new name!');
        }
    }
}

export const copy = async (fileCurrentPath, pathToNewDirectory) => {
    return new Promise(async (resolve, reject) => {
        if (!fileCurrentPath || !pathToNewDirectory) {
            reject(`Provide a current path of entity and a copy path for it!`);
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

            readStream.on('error', () =>
                reject('Copy was not successful, check a path and a new name!')
            );
            copyStream.on('error', (e) =>
                reject('Copy was not successful, check a path and a new name!')
            );

            copyStream.on('finish', () => {
                console.log('File was copied successfully!')
                resolve();
            });
        }
    });
}

export const move = async (fileCurrentPath, pathToNewDirectory) => {
    return new Promise(async (resolve, reject) => {
        if (!fileCurrentPath || !pathToNewDirectory) {
            reject(`Provide a current path of entity and a move path for it!`);
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

            readStream.on('error', () =>
                reject('Move was not successful, check a path and a new name!')
            );
            copyStream.on('error', (e) =>
                reject('Move was not successful, check a path and a new name!')
            );

            copyStream.on('finish', async () => {
                try {
                    await fsPromises.unlink(getPath(fileCurrentPath));
                    console.log('File was moved successfully!')
                    resolve();
                } catch (e) {
                    reject('File was created by a new destination, an error occured with the old file move!')
                }
            });
        }
    });
}