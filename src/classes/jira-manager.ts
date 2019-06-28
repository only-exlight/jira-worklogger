import axios from 'axios';
import { AxiosResponse, AxiosError } from 'axios';
import { JIRA_DOMAIN_V2, JIRA_DOMAIN } from '../const/jira';
import { IJiraWorkLog, IJiraSession, IJiraLogin, IReport } from '../interfaces/jira';
import { stdinQuestion, writeSeparator } from '../functions/exec';
import { Bar, Presets } from 'cli-progress';
import { bgBlue } from 'colors';

export class JiraManager {
    private session: IJiraSession;

    public async login() {
        writeSeparator();
        let sucess = false;
        process.stdout.write('Please auth to JIRA: \n');
        writeSeparator();
        const login = await stdinQuestion('Login: \n');
        const password = await stdinQuestion('Password: \n');
        sucess = true // await this.jiraLogin(login, password);
        !sucess ? await this.login() : process.stdout.write('Success! \n');
    }

    public async jiraWorkLogMass(reports: IReport[]) {
        process.stdout.write('Please wait for the end logging work process to JIRA system...\n\n');
        const progres = new Bar({ format: `[${bgBlue('{bar}')}] {percentage}%\n` }, Presets.shades_classic);
        progres.start(reports.length, 0);
        let progressState = 0;
        reports.forEach(async r => {
            await this.jiraLogWork(r.taskName, r.report);
            progressState++;
            progres.update(progressState);
            if (progressState === reports.length) {
                progres.stop();
                writeSeparator();
            }
        });
    }

    public async jiraLogWork(task: string, info: IJiraWorkLog): Promise<boolean> {
        try {
            /*await axios.post(`${JIRA_DOMAIN_V2}/${task}/worklog`, info, {
                headers: { Cookie: `${this.session.name}=${this.session.value};` }
            });*/
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    private async jiraLogin(user: string, psw: string): Promise<boolean> {
        try {
            const answ: AxiosResponse<IJiraLogin> = await axios.post(`${JIRA_DOMAIN}/rest/auth/1/session`, {
                username: user,
                password: psw
            });
            this.session = answ.data.session;
            return true;
        } catch (err) {
            const e: AxiosError = err;
            console.error(e.message);
            // write message here
            return false;
        }
    }
}