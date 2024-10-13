import { createReadStream } from 'fs';
import { join, isAbsolute } from 'path';

export const cat = (pathToFile) => {
    try {
        const filePath = isAbsolute(pathToFile) ? pathToFile : join(process.cwd(), pathToFile);
        const stream = createReadStream(filePath, 'utf8');

        stream.on('data', (chunk) => {
            process.stdout.write(chunk);
        });

        stream.on('error', (error) => {
            console.error('Operation failed:', error.message);
        });
    } catch (error) {
        console.error('Operation failed');
    }
};
