import { Task } from './task';
import * as moment from 'moment';
import { IReport } from '../interfaces/jira';

const LENGTH = 16;

export class TaskManager {
    currentTask: Task;
    todayTasks = new Map<string, Task>();

    get totalHours(): moment.Duration {
        let totalTime = 0;
        this.todayTasks.forEach(t => totalTime += t.totalTime.asSeconds());
        return moment.duration(totalTime, 's');
    }

    public extractTaskName(branchName: string): string {
        const parts = branchName.split('/');
        return parts[1] ? parts[1].toUpperCase() : '';
    }

    public switchToTask(taskName: string) {
        let task = this.todayTasks.get(taskName);
        if (!task) {
            task = new Task(taskName);
            this.todayTasks.set(taskName, task);
            const msg = 'START TASK'.padEnd(LENGTH, '-');
            process.stdout.write(`${msg}-${task.name}-TIME NOW: ${moment().format('hh:mm')}\n`);
        } else {
            const msg = 'CONTINUE TASK'.padEnd(LENGTH, '-');
            process.stdout.write(`${msg}-${task.name}-TIME NOW: ${moment().format('hh:mm')}\n`);
        }
        if (this.currentTask) {
            this.currentTask.cancelLast();
        }
        this.currentTask = task;
        this.currentTask.startWork();
    }

    public fixateJob(comment: string) {
        if (this.currentTask) {
            const msg = 'FIXATE JOB TASK'.padEnd(LENGTH, '-');
            process.stdout.write(`${msg}-${this.currentTask.name}-TIME NOW: ${moment().format('hh:mm')}\n`)
            this.currentTask.checkPoint(comment);
        } else {
            process.stdout.write('Please start task!\n');
        }
    }

    public writeAllTasks() {
        this.todayTasks.forEach(t =>
            process.stdout.write(`${t.name.padEnd(8)} - ${t.totalTime.asMinutes().toFixed(2)}m\n`));
    }

    public prepareReport(): IReport[] {
        const reports: IReport[] = [];
        this.todayTasks.forEach(t => reports.push(t.createReport()));
        return reports;
    }

}
