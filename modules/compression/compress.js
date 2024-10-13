import { createReadStream, createWriteStream } from 'fs';
import { createBrotliCompress } from 'zlib';
import { join, isAbsolute, basename } from 'path';
import { access, stat } from 'fs/promises';

export const compress = async (pathToFile, pathToDestination) => {
    try {
        const filePath = isAbsolute(pathToFile) ? pathToFile : join(process.cwd(), pathToFile);
        const destinationPath = isAbsolute(pathToDestination) ? pathToDestination : join(process.cwd(), pathToDestination);
        await access(filePath);

        const destStat = await stat(destinationPath);
        if (!destStat.isDirectory()) {
            throw new Error('Destination is not a directory');
        }

        const fileName = basename(filePath) + '.br';
        const outputFile = join(destinationPath, fileName);

        const readStream = createReadStream(filePath);
        const writeStream = createWriteStream(outputFile);
        const brotliCompress = createBrotliCompress();

        readStream.pipe(brotliCompress).pipe(writeStream);

        writeStream.on('finish', () => {
            console.log(`File compressed to ${outputFile} successfully.`);
        });

        writeStream.on('error', (error) => {
            console.error('Error during compression:', error.message);
        });
    } catch (error) {
        console.error('Operation failed COMPRESS:', error.message);
    }
};
