import { unlink } from 'fs/promises';
import { join, isAbsolute } from 'path';

export const rm = async (pathToFile) => {
    try {
        const filePath = isAbsolute(pathToFile) ? pathToFile : join(process.cwd(), pathToFile);
        await unlink(filePath);
        console.log(`File ${filePath} deleted successfully.`);
    } catch (error) {
        console.error('Operation failed:', error.message);
    }
};
