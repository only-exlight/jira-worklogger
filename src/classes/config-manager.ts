import { readFileSync, writeFileSync } from 'fs';
import { stdinQuestion } from '../functions/exec';
import JiraClient from 'jira-client';

export class ConfigManager {

    public checkConfig(): boolean {
        const result = readFileSync(`${this.configDir()}/config.json`).toString();
        return !!result;
    }

    public clearConfig(): void {
        writeFileSync(`${this.configDir()}/config.json`, '');
    }

    public async setConfig(): Promise<void> {
        const host = await stdinQuestion('Jira host: ');
        const login = await stdinQuestion('Jira login: ');
        const psw = await stdinQuestion('Jira password: ');
        const config: Partial<JiraClient.JiraApiOptions> = {
            host,
            username: login,
            password: psw,
        };
        writeFileSync(`${this.configDir()}/config.json`, JSON.stringify(config));
    }

    public readConfig(): JiraClient.JiraApiOptions {
        const config = readFileSync(`${this.configDir()}/config.json`).toString();
        return JSON.parse(config) as JiraClient.JiraApiOptions;
    }

    private configDir() {
        const configDir = __dirname.split('/');
        configDir.length--;
        return configDir.join('/');
    }
}
