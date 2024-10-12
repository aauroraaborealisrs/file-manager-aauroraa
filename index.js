const parseArgs = () => {
    const args = process.argv.slice(2);
    const username = args.find(arg => arg.startsWith('--username='))?.split('=')[1] || 'guest';
    console.log(`Welcome to the File Manager, ${username}!`);
    return username;
};

const username = parseArgs();

process.stdin.on('data', (data) => {
    const input = data.toString().trim();
    
    if (input === '.exit') {
        console.log(`Thank you for using File Manager, ${username}, goodbye!`);
        process.exit(0);
    }
});

process.on('SIGINT', () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    process.exit(0);
});