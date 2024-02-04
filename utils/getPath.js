import path from 'path';

export const getPath = data => {
    return path.isAbsolute(data) ? data : path.join(process.cwd(), data);
};