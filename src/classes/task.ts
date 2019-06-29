import * as moment from 'moment';
import { IReport } from '../interfaces/jira';

export interface ITimeInterval {
    start: moment.Moment;
    end?: moment.Moment;
    endComment?: string;
}

export class Task {
    startTime: moment.Moment;
    intervales: ITimeInterval[] = [];

    constructor(public name: string) {
        this.startTime = moment();
    }

    public startWork() {
        this.intervales.push({ start: moment() })
    }

    get totalTime(): moment.Duration {
        let time = 0;
        this.intervales.forEach(i => {
            if (i.end) {
                moment.duration;
                time += i.end.unix() - i.start.unix();
            } else {
                time += moment().unix() - i.start.unix();
            }
        });
        return moment.duration(time, 's');
    }

    public checkPoint(commentary: string) {
        const last = this.intervales[this.intervales.length - 1];
        last.end = moment();
        last.endComment = commentary;
        this.startWork();
    }

    public cancelLast() {
        this.intervales = this.intervales.slice(0, -1);
    }

    public createReport(): IReport {
        const report: IReport = {
            taskName: this.name,
            report: {
                started: this.intervales[0].start.toString(),
                comment: '',
                timeSpentSeconds: this.totalTime.asSeconds(),
                visibility: {
                    type: '',
                    value: ''
                }
            }
        };
        this.intervales.forEach(i => report.report.comment += `${i.endComment} \n`);
        return report;
    }
}