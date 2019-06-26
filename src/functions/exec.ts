import { exec } from 'child_process';

export async function pExec(command: string): Promise<string> {
    return new Promise((resolve, reject) => exec(command, (err, stdOut) => err ? reject(err) : resolve(stdOut)));
}