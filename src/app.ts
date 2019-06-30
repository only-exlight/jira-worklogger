import { PORT, APP_NAME, VERSION } from './const/app-consts';
import { currentBranch } from './functions/parse-branch';
import { E_PROTOKOL_EVENT, IProtokol } from './const/protocol';
import { writeSeparator } from './functions/exec';
import { TaskManager } from './classes/task-manager';
import { JiraManager } from './classes/jira-manager';
import * as express from 'express';
import { json } from 'body-parser';

export async function main() {
    const taskManager = new TaskManager();
    const jiraManager = new JiraManager();
    const app = express();

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

    app.use(json());

    app.get('/', (_, res) => {
        res.send(`Welcome to ${APP_NAME} ${VERSION}\n`);
        res.end();
    });

    app.put('/event', async (req, res) => {
        const msg: IProtokol = req.body;
        switch (msg.event) {
            case E_PROTOKOL_EVENT.post_checkout: {
                const branch = await currentBranch();
                if (branch !== 'master') {
                    const taskName = taskManager.extractTaskName(branch);
                    taskManager.switchToTask(taskName);
                } else {
                    // case for swich to master branch
                    console.warn('!');
                }
                break;
            }
            case E_PROTOKOL_EVENT.commit_msg: {
                taskManager.fixateJob(req.body.info);
                break;
            }
            case E_PROTOKOL_EVENT.pre_commit: {
                // process.stdin.write(`${JSON.stringify(msg)}\n`);
                break
            }
            default: process.stdout.write(`Error parse message!\n ${JSON.stringify(msg)}\n`);
        }
        res.end();
    });

    app.listen(PORT, () => {
        process.stdout.write('Listen GIT hooks...\n');
        writeSeparator();
    });

    process.on('SIGINT', async () => {
        process.stdout.write('\nWork log today:\n');
        taskManager.writeAllTasks();
        writeSeparator();
        process.stdout.write(`Hours total: ${taskManager.totalHours.asHours().toFixed(2)}h\n`);
        writeSeparator();
        const reports = taskManager.prepareReport();
        await jiraManager.jiraWorkLogMass(reports);
        process.stdout.write('Thanks for use! Good evening!\n');
        process.exit(0);
    });
}
