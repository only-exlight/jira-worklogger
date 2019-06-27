import { createServer } from 'net';
import { Socket } from 'dgram';
import { PORT, HOST, APP_NAME, VERSION } from './const/app-consts';
import { parseBranch, currentBranch, extractTaskName } from './functions/parse-branch';
import { E_PROTOKOL_EVENT, IProtokol } from './const/protocol';
import { Task } from './classes/task';
import { stdinQuestion } from './functions/exec';
import { jiraLogin, jiraLogWork } from './functions/jira';

export async function main() {
    process.stdout.write('Good day for work! \n');
    process.stdout.write(`Welcome to ${APP_NAME} ${VERSION}\n`);
    const branch = await currentBranch();
    if (branch !== 'master') {
        process.stdout.write('Pleace start your work from master branch! \nHelp: git checkout master \n');
        process.exit(0);
    }
    process.stdout.write('Please auth to JIRA \n');
    const login = await stdinQuestion('Login: ');
    const password = await stdinQuestion('Password: ');
    // const s = await jiraLogin(login, password);
    // console.warn(s);

    let currentTask: Task;
    const todayTasks: Task[] = [];

    const TCP_SRV = createServer()
        .listen(PORT, HOST, () => process.stdout.write('Listen GIT hooks...\n'));

    TCP_SRV.on('connection', (socket: Socket) =>
        socket.on('data', async (data: Buffer) => {
            const jsonData = data.toString();
            const msg: IProtokol = JSON.parse(jsonData);
            switch (msg.event) {
                case E_PROTOKOL_EVENT.post_checkout: {
                    const branch = await currentBranch();
                    if (branch !== 'master') {
                        const taskName = extractTaskName(branch);
                        currentTask = todayTasks.find(t => t.name === taskName);
                        if (!currentTask) {
                            currentTask = new Task(taskName);
                            todayTasks.push(currentTask);
                            process.stdout.write(`Start task ${currentTask.name}. TIME NOW: ${new Date().getUTCHours()}:${new Date().getUTCMinutes()}\n`);
                        } else {
                            process.stdout.write(`Continue task ${currentTask.name}. TIME NOW: ${new Date().getUTCHours()}:${new Date().getUTCMinutes()}\n`);
                        }
                    } else {
                        // case for swich to master branch
                    }
                    break;
                }
                case E_PROTOKOL_EVENT.commit_msg: {
                    const branch = await currentBranch();
                    const taskName = extractTaskName(branch);
                    if (taskName === currentTask.name) {
                        currentTask.checkPoint(msg.info);
                        console.log(`Check point task ${currentTask.name}. TIME NOW: ${new Date().getUTCHours()}:${new Date().getUTCMinutes()}. INFO: ${msg.info} \n`);
                    } else {

                    }
                    break;
                }
                default: console.log('Error parse message!');
            }
        })
    );

    process.on('SIGINT', () => {
        process.stdout.write('\nWork log today:\n');
        let totalTime = 0;
        todayTasks.forEach(t => {
            totalTime += t.totalTime;
            const total = new Date(t.totalTime);
            process.stdout.write(`${t.name.padEnd(8)} - ${total.getUTCHours()}:${total.getUTCMinutes()}\n`);
        });
        const totalDate = new Date(totalTime);
        process.stdout.write(`Hours total: ${totalDate.getUTCHours()}:${totalDate.getUTCMinutes()}\n`);
        process.stdout.write('Please wait for the end logging work process to JIRA system...\n');
        /*todayTasks.map(t => {
            return jiraLogWork(t.name, {
                comment: 'test',
                started: new Date(),
                timeSpentSeconds: t.totalTime,
                visibility: {
                    type: 'as',
                    value: 'asd'
                }
            }, {
                name: 'test',
                value: 'asd'
            });
        })*/

        process.stdout.write('Thanks for use! Good evening!\n');

        process.exit(0);
    });
}
