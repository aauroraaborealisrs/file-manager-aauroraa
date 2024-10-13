import { chdir, cwd } from 'process';
import { resolve } from 'path';
import { access } from 'fs/promises';  
import { constants } from 'fs';

export const up = () => {
    try {
        const currentDir = cwd();
        const parentDir = resolve(currentDir, '..');

        
        if (currentDir === parentDir) {
            console.log("You are already at the root directory.");
        } else {
            chdir(parentDir);
        }
    } catch (error) {
        console.error('Operation failed');
    }
};

export const cd = async (path) => {
    try {
        const resolvedPath = resolve(path);
        await access(resolvedPath, constants.F_OK);
        chdir(resolvedPath);  
    } catch (error) {
        console.error(`Operation failed: ${error.message}`);  
    }
};