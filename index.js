import { chdir } from 'process';
import { homedir } from 'os';
import { up, cd } from './modules/navigation.js';  
import {ls} from './modules/ls.js';

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
            const [command, ...args] = input.split(' ');

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
                default:
                    console.log('Command not implemented yet.');
            }
        } catch (error) {
            console.error('Operation failed');
        }
    }
    printCurrentDirectory();
});

process.on('SIGINT', () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    process.exit(0);
});
