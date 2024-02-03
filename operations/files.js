import fs, { promises as fsPromises } from 'fs';
import { basename } from 'path';
import {getPath} from "../utils/index.js";

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

const isPathExist = async path => {
    let isExist;

    try {
        await fsPromises.stat(path);
        isExist = true;
    } catch (err) {
        isExist = false;
    }

    return isExist;
}

export const rn = async (fileOldPath, fileNewName) => {
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