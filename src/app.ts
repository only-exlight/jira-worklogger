import { createServer } from 'net';
import { Socket } from 'dgram';
import { PORT, HOST, APP_NAME, VERSION } from './const/app-consts';
import { currentBranch } from './functions/parse-branch';
import { E_PROTOKOL_EVENT, IProtokol } from './const/protocol';
import { writeSeparator } from './functions/exec';
import { TaskManager } from './classes/task-manager';
import { JiraManager } from './classes/jira-manager';

export async function main() {
    let taskManager = new TaskManager();
    let jiraManager = new JiraManager();
    writeSeparator();
    process.stdout.write('Good day for work! \n');
    process.stdout.write(`Welcome to ${APP_NAME} ${VERSION}\n`);
    const branch = await currentBranch();
    if (branch !== 'master') {
        process.stdout.write('Pleace start your work from master branch! \nHelp: git checkout master \n');
        process.exit(0);
    }
    await jiraManager.login();
    writeSeparator();
    const TCP_SRV = createServer()
        .listen(PORT, HOST, () => {
            process.stdout.write('Listen GIT hooks...\n');
            writeSeparator();
        });

    TCP_SRV.on('connection', (socket: Socket) =>
        socket.on('data', async (data: Buffer) => {
            const jsonData = data.toString();
            const msg: IProtokol = JSON.parse(jsonData);
            switch (msg.event) {
                case E_PROTOKOL_EVENT.post_checkout: {
                    const branch = await currentBranch();
                    if (branch !== 'master') {
                        const taskName = taskManager.extractTaskName(branch);
                        taskManager.switchToTask(taskName);
                    } else {
                        // case for swich to master branch
                    }
                    break;
                }
                case E_PROTOKOL_EVENT.commit_msg: {
                    taskManager.fixateJob(msg.info);
                    break;
                }
                default: process.stdout.write('Error parse message!\n');
            }
        })
    );

    process.on('SIGINT', async () => {
        process.stdout.write('\nWork log today:\n');
        taskManager.writeAllTasks();
        writeSeparator();
        process.stdout.write(`Hours total: ${taskManager.totalHours.format('HH:mm')}\n`);
        writeSeparator();
        const reports = taskManager.prepareReport();
        await jiraManager.jiraWorkLogMass(reports);
        process.stdout.write('Thanks for use! Good evening!\n');
        process.exit(0);
    });
}
