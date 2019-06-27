import * as moment from 'moment';

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

    get totalTime(): moment.Moment {
        let time = 0;
        this.intervales.forEach(i => {
            if (i.end) {
                time += i.end.valueOf() - i.start.valueOf();
            } else {
                time += moment().valueOf() - i.start.valueOf();
            }
        });
        return moment.unix(time);
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
}