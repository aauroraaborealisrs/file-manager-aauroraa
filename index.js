import { chdir } from 'process';
import { homedir } from 'os';
import { up, cd } from './modules/navigation/navigation.js';  
import { ls } from './modules/navigation/ls.js';
import { cat } from './modules/basic_operations/cat.js';
import { add } from './modules/basic_operations/add.js';
import { rn } from './modules/basic_operations/rename.js';
import { cp } from './modules/basic_operations/copy.js';
import { mv } from './modules/basic_operations/move.js';
import { rm } from './modules/basic_operations/remove.js';
import { getEOL } from './modules/os/eol.js';
import { getSystemUsername, getHomeDir, getArchitecture } from './modules/os/os.js';
import { getCPUs } from './modules/os/cpu.js';
import { calculateHash } from './modules/hash/hash.js';
import { compress } from './modules/compression/compress.js';
import { decompress } from './modules/compression/decompress.js';

const parseArgs = () => {
    const args = process.argv.slice(2);
    const username = args.find(arg => arg.startsWith('--username='))?.split('=')[1] || 'guest';
    console.log(`Welcome to the File Manager, ${username}!`);
    return username;
};

const printCurrentDirectory = () => {
    console.log(`You are currently in ${process.cwd()}`);
};

const username = parseArgs();
const homeDirectory = homedir();
chdir(homeDirectory);
printCurrentDirectory();

const validCommands = [
    'up', 'cd', 'ls', 'cat', 'add', 'rn', 'cp', 'mv', 'rm',
    'os --EOL', 'os --cpus', 'os --homedir', 'os --username', 'os --architecture',
    'hash', 'compress', 'decompress'
];

const isValidCommand = (input) => {
    return validCommands.some(command => input.startsWith(command));
};

process.stdin.on('data', async (data) => {
    const input = data.toString().trim();

    if (input === '.exit') {
        console.log(`Thank you for using File Manager, ${username}, goodbye!`);
        process.exit(0);
    }

    if (!isValidCommand(input)) {
        console.log('Invalid input');
    } else {
        try {
            const [command, ...args] = input.match(/(?:[^\s"]+|"[^"]*")+/g).map(arg => arg.replace(/"/g, ''));

            switch (command) {
                case 'up':
                    up();
                    break;
                case 'cd':
                    if (args.length > 0) {
                        await cd(args.join(' '));  
                    } else {
                        console.log('Invalid input: path is missing');
                    }
                    break;
                case 'ls':
                    await ls();
                    break;
                case 'cat':
                    if (args.length > 0) {
                        cat(args.join(' '));
                    } else {
                        console.log('Invalid input: path is missing');
                    }
                    break;
                case 'add':
                    if (args.length > 0) {
                        await add(args[0]);
                    } else {
                        console.log('Invalid input: file name is missing');
                    }
                    break;
                case 'rn':
                    if (args.length === 2) {
                        await rn(args[0], args[1]);
                    } else {
                        console.log('Invalid input: path or new file name is missing');
                    }
                    break;
                case 'cp':
                    if (args.length === 2) {
                        await cp(args[0], args[1]);
                    } else {
                        console.log('Invalid input: source file or destination directory is missing');
                    }
                    break;
                case 'mv':
                    if (args.length === 2) {
                        await mv(args[0], args[1]);
                    } else {
                        console.log('Invalid input: source file or destination directory is missing');
                    }
                    break;
                case 'rm':
                    if (args.length > 0) {
                        await rm(args.join(' ')); 
                    } else {
                        console.log('Invalid input: path is missing');
                    }
                    break;
                case 'os':
                    switch (args[0]) {
                        case '--EOL':
                            getEOL();
                            break;
                        case '--cpus':
                            getCPUs();
                            break;
                        case '--homedir':
                            getHomeDir();
                            break;
                        case '--username':
                            getSystemUsername();
                            break;
                        case '--architecture':
                            getArchitecture();
                            break;
                        default:
                            console.log('Invalid OS command');
                    }
                    break;
                case 'hash':
                    if (args.length > 0) {
                        await calculateHash(args.join(' '));
                    } else {
                        console.log('Invalid input: path to file is missing');
                    }
                    break;
                case 'compress':
                    if (args.length === 2) {
                        await compress(args[0], args[1]);
                    } else {
                        console.log('Invalid input: source file or destination is missing');
                    }
                    break;
                case 'decompress':
                    if (args.length === 2) {
                        await decompress(args[0], args[1]);
                    } else {
                        console.log('Invalid input: source file or destination is missing');
                    }
                    break;
                default:
                    console.log('Command not implemented yet.');
            }
        } catch (error) {
            console.error('Operation failed in main');
        }
    }
    printCurrentDirectory();
});

process.on('SIGINT', () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    process.exit(0);
});
