import { IJiraSession, IReport, IJiraWorkLog } from '../interfaces/jira';
import { stdinQuestion, writeSeparator } from '../functions/exec';
import { Bar, Presets } from 'cli-progress';
import { bgBlue } from 'colors';
import JiraClient from 'jira-client';

export class JiraManager {
    private jiraClient = new JiraClient({
        protocol: 'https',
        apiVersion: '2',
        host: 'http://jira.ntrlab.ru',
        username: 'akernichniy',
        password: '2016jiraMinsk',
    });

    public async jiraWorkLogMass(reports: IReport[]) {
        process.stdout.write('Please wait for the end logging work process to JIRA system...\n\n');
        const progres = new Bar({ format: `[${bgBlue('{bar}')}] {percentage}%\n` }, Presets.shades_classic);
        progres.start(reports.length, 0);
        let progressState = 0;
        reports.forEach(async r => {
            await this.jiraClient.addWorklog(r.taskName, r.report);
            progressState++;
            progres.update(progressState);
            if (progressState === reports.length) {
                progres.stop();
                writeSeparator();
            }
        });
    }

}