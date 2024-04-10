import * as fs from 'fs';

export function parseEnv(file: string) {
    const envFileContent = fs.readFileSync(file, 'utf8');
    const lines = envFileContent.split('\n');

    const envVariables: { [key: string]: string } = {};

    lines.forEach(line => {
        const [key, value] = line.split('=');
        if(key && value) {
            envVariables[key.trim()] = value.trim();
        }
    });

    return envVariables;
}