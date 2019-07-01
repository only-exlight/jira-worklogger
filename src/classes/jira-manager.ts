import { IReport } from '../interfaces/jira';
import { writeSeparator } from '../functions/exec';
import { Bar, Presets } from 'cli-progress';
import { bgBlue } from 'colors';
import JiraClient from 'jira-client';
import { ConfigManager } from './config-manager';

export class JiraManager {
    private configManager = new ConfigManager();
    private jiraClient: JiraClient

    constructor() {
        if (this.configManager.checkConfig()) {
            const config: JiraClient.JiraApiOptions = this.configManager.readConfig();
            this.jiraClient = new JiraClient(config);
        } else {
            process.stdout.write('No config! Set config: use command \'jwl-config\'\n');
            process.exit(0);
        }
    }

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