import { getPath } from "../utils/index.js";
import fs from "fs";
import zlib from "zlib";

export const compress = async (filePath, pathToDestination) => {
    return new Promise(async (resolve, reject) => {
        if (!filePath || !pathToDestination) {
            reject(`Invalid input, provide a current path to file and a destination path for compression!`);
            return;
        }

        try {
            const readStream = fs.createReadStream(getPath(filePath));
            const writeStream = fs.createWriteStream(getPath(pathToDestination));

            readStream.on('error', (e) =>
                reject(e)
            );

            const brotli = zlib.createBrotliCompress();

            const compressStream = readStream.pipe(brotli).pipe(writeStream);

            compressStream.on('finish', () => {
                console.log('✅ Compressing was done successfully!')
                resolve();
            });

            compressStream.on('error', (e) =>
                reject(e)
            );
        } catch (e) {
            reject(e);
        }
    });
}

export const decompress = async (filePath, pathToDestination) => {
    return new Promise(async (resolve, reject) => {
        if (!filePath || !pathToDestination) {
            reject(`Invalid input, provide a current path to file and a destination path for decompression!`);
            return;
        }

        try {
            const readStream = fs.createReadStream(getPath(filePath));
            const writeStream = fs.createWriteStream(getPath(pathToDestination));

            readStream.on('error', (e) =>
                reject(e)
            );

            const brotli = zlib.createBrotliDecompress();

            const decompressStream = readStream.pipe(brotli).pipe(writeStream);

            decompressStream.on('finish', () => {
                console.log('✅ Decompressing was done successfully!')
                resolve();
            });

            decompressStream.on('error', (e) =>
                reject(e)
            );
        } catch (e) {
            reject(e);
        }
    });
}
