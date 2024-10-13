import { readdir, stat } from 'fs/promises';
import { join } from 'path';

export const ls = async () => {
    try {
        const currentDir = process.cwd();
        const items = await readdir(currentDir);

        const files = [];
        const directories = [];

        for (const item of items) {
            const itemPath = join(currentDir, item);
            const itemStat = await stat(itemPath);

            if (itemStat.isDirectory()) {
                directories.push({ Name: item, Type: 'directory' });
            } else {
                files.push({ Name: item, Type: 'file' });
            }
        }

        directories.sort((a, b) => a.Name.localeCompare(b.Name));
        files.sort((a, b) => a.Name.localeCompare(b.Name));

        const sortedItems = [...directories, ...files];
        
        console.table(sortedItems);
    } catch (error) {
        console.error('Operation failed');
    }
};
