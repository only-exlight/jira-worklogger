import { createServer } from 'net';
import { Socket } from 'dgram';
import { PORT, HOST } from './const/net';
import { parseBranch, currentBranch, extractTaskName } from './functions/parse-branch';
import { E_PROTOKOL_MSG } from './const/protocol';
import { Task } from './classes/task';

export async function main() {
    console.log('Good day for work!')
    console.log('Welcome to JIRA AUTOWORKLOGGER 0.0.1');
    const branch = await currentBranch();
    if (branch !== 'master') {
        console.log('Pleace start your work from master branch! \nHelp: git checkout master');
        process.exit(0);
    }

    let currentTask: Task;
    const todayTasks: Task[] = [];

    const TCP_SRV = createServer()
        .listen(PORT, HOST, () => console.log('Listen GIT hooks'));

    TCP_SRV.on('connection', (socket: Socket) => {
        socket.on('data', async (data: Buffer) => {
            const msg = data.toString();
            switch (msg) {
                case E_PROTOKOL_MSG.new_branch_task: {
                    const branch = await currentBranch();
                    if (branch !== 'master') {
                        const taskName = extractTaskName(branch);
                        currentTask = todayTasks.find(t => t.name === taskName);
                        if (!currentTask) {
                            currentTask = new Task(taskName);
                            todayTasks.push(currentTask);
                            console.log(`Start task ${currentTask.name}. TIME NOW: ${new Date()}`);
                        } else {
                            console.log(`Continue task ${currentTask.name}. TIME NOW: ${new Date()}`);
                        }
                    } else {
                        // case for swich to master branch
                    }
                    break;
                }
                case E_PROTOKOL_MSG.commit_task: {
                    console.log('Commit task');
                    break;
                }
                default: console.log('Error parse message!');
            }
        });
    });

    process.on('SIGINT', () => {
        console.log('\n');
        console.log('Work log today:');
        let totalTime = 0;
        todayTasks.forEach(t => {
            totalTime += t.totalTime;
            const total = new Date(t.totalTime);
            console.log(`${t.name.padEnd(8)} - ${total.getUTCHours()}:${total.getUTCMinutes()}`);
        });
        const totalDate = new Date(totalTime);
        console.log(`Hours total: ${totalDate.getUTCHours()}:${totalDate.getUTCMinutes()}`);
        console.log('Thanks for use! Good evening!');

        process.exit(0);
    });
}
