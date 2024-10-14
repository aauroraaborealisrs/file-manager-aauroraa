import { createReadStream } from 'fs';
import { createHash } from 'crypto';
import { join, isAbsolute } from 'path';
import { access } from 'fs/promises';

export const calculateHash = async (pathToFile) => {
    try {
        const filePath = isAbsolute(pathToFile) ? pathToFile : join(process.cwd(), pathToFile);
        await access(filePath);

        const hash = createHash('sha256');
        const stream = createReadStream(filePath);

        stream.on('data', (chunk) => {
            hash.update(chunk);
        });

        stream.on('end', () => {
            const hashValue = hash.digest('hex');
            console.log(`SHA-256 hash: ${hashValue}`);
        });

        stream.on('error', (error) => {
            console.error('Error reading the file:', error.message);
        });
    } catch (error) {
        console.error('Operation failed:', error.message);
    }
};
