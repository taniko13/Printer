import { observable, action } from 'mobx';
import moment from 'moment';

export interface IJobModel {
    id: string;
    name: string;
    duration: string;
    status: string;
}
export class JobModel {
    key: string;
    name: string;
    duration: number;
    @observable status: string;
    @observable startTime: string;
    @observable endTime: string;

    constructor(key: string, name: string, status: string, duration: number | string, startTime?: string, endTime?: string) {
        this.key = key;
        this.name = name;
        this.duration = +duration || 100;
        this.status = status;
        let d = moment(new Date());
        this.startTime = startTime || d.format('LTS');
        let e = d.add(duration, 'seconds');
        this.endTime = endTime || d.format('LTS');
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