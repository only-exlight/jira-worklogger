import axios from 'axios';
import { AxiosResponse } from 'axios';
import { JIRA_DOMAIN_V2, JIRA_DOMAIN } from '../const/jira';
import { IJiraWorkLog, IJiraSession, IJiraLogin } from '../interfaces/jira';

export async function jiraLogWork(task: string, info: IJiraWorkLog, cookie: IJiraSession): Promise<boolean> {
    try {
        await axios.post(`${JIRA_DOMAIN_V2}/${task}/worklog`, info, {
            headers: { Cookie: `${cookie.name}=${cookie.value};` }
        });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function jiraLogin(user: string, psw: string): Promise<IJiraSession> {
    try {
        const answ: AxiosResponse<IJiraLogin> = await axios.post(`${JIRA_DOMAIN}/rest/auth/1/session`, {
            username: user,
            password: psw
        });
        return answ.data.session;
    } catch (err) {
        throw new Error('Can not login to JIRA');
    }
}