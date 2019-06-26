export interface ITimeInterval {
    start: Date;
    end?: Date;
    endComment?: string;
}

export class Task {
    startTime: Date;
    intervales: ITimeInterval[] = [];

    constructor(public name: string) {
        this.startTime = new Date();
        this.intervales.push({ start: new Date() })
    }

    startWork() {

    }

    get totalTime(): number {
        let time = 0;
        this.intervales.forEach(i => {
            if (i.end) {
                time += i.end.getTime() - i.start.getTime();
            } else {
                time += new Date().getTime() - i.start.getTime();
            }
        });
        return time;
    }

    checkPoint(commentary: string) {
        const last = this.intervales[this.intervales.length - 1];
        last.end = new Date();
        last.endComment = commentary;
    }
}