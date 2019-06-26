import axios from 'axios';
import { JIRA_DOMAIN_V2, JIRA_DOMAIN_V1 } from '../const/jira';
import { IJiraWorkLog, IJiraSession, IJiraLogin } from '../interfaces/jira';

export async function jiraLogWork(task: string, info: IJiraWorkLog): Promise<boolean> {
    try {
        await axios.post(`${JIRA_DOMAIN_V2}/${task}/worklog`, info);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function jiraLogin(user: string, psw: string): Promise<IJiraSession> {
    try {
        const answ: IJiraLogin = await axios.post(`${JIRA_DOMAIN_V1}/session`, {
            username: user,
            password: psw
        });
        return answ.session;
    } catch (err) {
        throw new Error('Can not login to JIRA');
    }
}