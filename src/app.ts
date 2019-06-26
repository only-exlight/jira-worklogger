import { createServer } from 'net';
import { Socket } from 'dgram';
import { PORT, HOST } from './const/net';
import { parseBranch } from './functions/parse-branch';
import { E_PROTOKOL_MSG } from './const/protocol';

export async function main() {
    const branches = await parseBranch();
    console.warn(branches);

    const TCP_SRV = createServer()
        .listen(PORT, HOST, () => console.warn('Listen GIT hooks'));

    TCP_SRV.on('connection', (socket: Socket) => {
        socket.on('data', (data: Buffer) => {
            const msg = data.toString();
            switch (msg) {
                case E_PROTOKOL_MSG.new_branch_task: {
                    console.warn('new branch for task');
                    break;
                }
                case E_PROTOKOL_MSG.commit_task: {
                    console.warn('Commit task');
                    break;
                }
                default: console.log('Error parse message!');
            }
        });
    });
}

