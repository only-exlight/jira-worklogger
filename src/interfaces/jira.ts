export interface IJiraWorkLog {
    comment: string;
    visibility: {
        type: string;
        value: string;
    },
    started: Date;
    timeSpentSeconds: number;
}

export interface IJiraSession {
    name: string;
    value: string;
}

export interface IJiraLogin {
    session: IJiraSession;
    loginInfo: {
        failedLoginCount: number;
        loginCount: number;
        lastFailedLoginTime: Date | string;
        previousLoginTime: Date | string;
    }
}

export interface IReport {
    taskName: string;
    report: IJiraWorkLog;
}