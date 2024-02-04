import {getPath} from "../utils/index.js";
import fs from "fs/promises";
import { createHash } from 'crypto';

export const hash = async pathData => {
    if (!pathData) {
        throw new Error(`Invalid input, provide a path to file for hashing!`);
    }

    try {
        const path = getPath(pathData);
        const hash = createHash('sha256');

        const sourceData = await fs.readFile(path);

        hash.update(sourceData);
        const digest = hash.digest('hex');

        console.log(`Hash was created successfully: ${digest}`);
    } catch (e) {
        throw new Error(e);
    }
}