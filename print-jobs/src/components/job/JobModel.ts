import { observable, action } from 'mobx';

export class JobModel {
    key: string;
    name: string;
    duration: number;
    @observable status: string;
    @observable startTime: string;
    @observable endTime: string;

    constructor(name: string, duration?: number, startTime?: string) {
        this.key = name;
        this.name = name;
        this.duration = duration || 100;
        this.status = "queued";
        let d = new Date();
        this.startTime = startTime || d.toLocaleTimeString();
        d.setSeconds(d.getSeconds() + this.duration);
        this.endTime = d.toLocaleTimeString();
    }

    @action
    setStatus(status: string) {
        this.status = status;
    }

    @action
    setStartTime(startTime: string) {
        this.startTime = startTime;
    }

    @action
    setEndTime(endTime: string) {
        this.endTime = endTime;
    }
}