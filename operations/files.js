import fs, { promises as fsPromises } from 'fs';
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