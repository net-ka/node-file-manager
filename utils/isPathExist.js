import fs from "fs/promises";

export const isPathExist = async path => {
    let isExist;

    try {
        await fs.stat(path);
        isExist = true;
    } catch (err) {
        isExist = false;
    }

    return isExist;
}