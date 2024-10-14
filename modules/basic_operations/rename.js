import { rename, access } from 'fs/promises';
import { join, isAbsolute, dirname } from 'path';

export const rn = async (pathToFile, newFileName) => {
    try {
        const filePath = isAbsolute(pathToFile) ? pathToFile : join(process.cwd(), pathToFile.trim());
        const newFilePath = join(dirname(filePath), newFileName.trim());
        await access(filePath);
        await rename(filePath, newFilePath);
        console.log(`File renamed to ${newFileName} successfully.`);
    } catch (error) {
        console.error('Operation failed:', error.message);
    }
};
