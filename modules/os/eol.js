import { EOL } from 'os';

export const getEOL = () => {
    const eolRepresentation = EOL === '\n' ? '\\n' : '\\r\\n';
    console.log(`Default End-Of-Line (EOL) sequence: ${eolRepresentation}`);
};