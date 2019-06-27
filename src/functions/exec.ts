import { exec } from 'child_process';
import { createInterface } from 'readline';
import { Writable } from 'stream';

export async function pExec(command: string): Promise<string> {
    return new Promise((resolve, reject) => exec(command, (err, stdOut) => err ? reject(err) : resolve(stdOut)));
}

export async function stdinQuestion(question: string): Promise<string> {
    process.stdin.setEncoding('utf8');
    return new Promise(resolve => {
        const rl = createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        rl.question(question, answ => {
            rl.close();
            resolve(answ)
        });
    });

}