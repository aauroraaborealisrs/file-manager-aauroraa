import { writeFile, access } from 'fs/promises';
import { join } from 'path';

export const add = async (fileName) => {
    try {
        const filePath = join(process.cwd(), fileName);
                try {
            await access(filePath);
            console.error('Operation failed: File already exists.');
            return;
        } catch (error) {

        }
        await writeFile(filePath, '', 'utf8');
        console.log(`File ${fileName} created successfully.`);
    } catch (error) {
        console.error('Operation failed:', error.message);
    }
};

