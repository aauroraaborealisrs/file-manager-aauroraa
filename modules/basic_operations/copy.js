import { createReadStream, createWriteStream } from 'fs';
import { join, basename, isAbsolute } from 'path';
import { access, stat } from 'fs/promises';

export const cp = async (pathToFile, pathToNewDirectory) => {
    try {
        const filePath = isAbsolute(pathToFile) ? pathToFile : join(process.cwd(), pathToFile);
        const newDirectoryPath = isAbsolute(pathToNewDirectory) ? pathToNewDirectory : join(process.cwd(), pathToNewDirectory);
        await access(filePath);
        const directoryStats = await stat(newDirectoryPath);
        if (!directoryStats.isDirectory()) {
            throw new Error('Target path is not a directory');
        }

        const fileName = basename(filePath); 
        const destinationPath = join(newDirectoryPath, fileName); 
        const readStream = createReadStream(filePath);
        const writeStream = createWriteStream(destinationPath);
        readStream.pipe(writeStream);

        readStream.on('error', (error) => {
            console.error('Error during reading file:', error.message);
        });

        writeStream.on('error', (error) => {
            console.error('Error during writing file:', error.message);
        });

        writeStream.on('finish', () => {
            console.log(`File copied to ${destinationPath} successfully.`);
        });
    } catch (error) {
        console.error('Operation failed:', error.message);
    }
};
