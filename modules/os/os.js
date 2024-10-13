import { homedir, userInfo, arch } from 'os';

export const getHomeDir = () => {
    console.log(`Home directory: ${homedir()}`);
};

export const getSystemUsername = () => {
    const { username } = userInfo();
    console.log(`System username: ${username}`);
};

export const getArchitecture = () => {
    console.log(`CPU architecture: ${arch()}`);
};
