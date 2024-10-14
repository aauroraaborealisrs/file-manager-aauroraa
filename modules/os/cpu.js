import { cpus } from 'os';

export const getCPUs = () => {
    const cpuInfo = cpus();
    console.log(`Number of CPUs: ${cpuInfo.length}`);
    cpuInfo.forEach((cpu, index) => {
        const { model, speed } = cpu;
        console.log(`CPU ${index + 1}: ${model}, ${speed / 1000} GHz`);
    });
};