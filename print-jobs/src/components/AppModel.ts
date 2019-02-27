import { JobModel, IJobModel } from "./job/JobModel";
import { observable, action } from 'mobx';
import axios from 'axios-jsonp-pro';
import { Guid } from "guid-typescript";
import moment from 'moment';

export class AppModel {
    @observable isAddNew: boolean;
    @observable jobsToPrint: JobModel[];
    holeDuration: number;

    constructor() {
        this.isAddNew = false;
        this.jobsToPrint = [];
        this.holeDuration = 0;
        this.getAllJobs();
    }

    //Open the CreateJob component when we want to add a new job. 
    //Or remove the component from the DOM.
    @action
    shouldNewJob(add: boolean) {
        this.isAddNew = add;
    }

    @action
    setJobsToPrint(data: IJobModel[]) {
        if (data != undefined && data.length > 0) {
            let jobs = data.map(d => {
                let numDur: number = +d.duration;
                let timeToStart = moment(new Date()).add(this.holeDuration, 'seconds');
                this.holeDuration += numDur;
                let timeToEnd = timeToStart.add(numDur, 'seconds');
                return new JobModel(d.id, d.name, d.status, numDur, timeToStart.format('LTS'), timeToEnd.format('LTS'))
            });
            this.jobsToPrint = jobs;
        }
    }

    //Load jobs from server
    getAllJobs() {
        axios.get('http://localhost:8080/RESTfulCRUD/rest/jobs')
            .then(response => this.setJobsToPrint(response.data))
            .catch(error => console.log(error))
    }



    //Creates a new job model 
    createNewJob(name: string, duration: number) {
        this.isAddNew = false;
        let timeToStart = moment(new Date()).add(this.holeDuration, 'seconds');
        this.holeDuration += duration;
        let timeToEnd = timeToStart.add(duration, 'seconds');
        let id = Guid.create().toString();
        let job: JobModel = new JobModel(id, name, "queued", duration, timeToStart.format('LTS'), timeToEnd.format('LTS'));
        if (job != null) {
            this.addNewJob(job);
        }
        //Delete from server
        // axios.post('http://localhost:8080/RESTfulCRUD/rest/jobs', job)
        //     .then(response => console.log(response.status))
        //     .catch(error => console.log(error));

    }

    //Adds the new job to the queue
    @action
    addNewJob(job: JobModel) {
        this.holeDuration += job.duration;
        this.jobsToPrint.push(job);
    }

    //Delete the job from the queue, only if the status of job isn't printing
    @action
    deleteJob(id: string) {
        if (this.jobsToPrint.find(job => job.key === id && job.status === 'printing')) {
            alert('The job is at printing process, you cannot delete it');
        }
        else {
            let jobToDel = this.jobsToPrint.find(job => (job.key !== id));
            this.holeDuration -= jobToDel ? jobToDel.duration : 0;
            this.jobsToPrint = this.jobsToPrint.filter(job => (job.key !== id));
        }

        //Delete from server
        // axios.delete('http://localhost:8080/RESTfulCRUD/rest/jobs/' + id)
        //     .then(response => console.log(response.status))
        //     .catch(error => console.log(error));
    }

    //This function starts to printing the jobs from the queue 
    @action
    printJobs() {
        if (this.jobsToPrint != undefined && this.jobsToPrint.length > 0) {
            this.printJob(this.jobsToPrint[0])
        }
    }

    //Prints the current job, change the job status, and set time out to call the finish function
    @action
    printJob(jobToPrint: JobModel) {
        if (jobToPrint != undefined) {
            let time: number = jobToPrint.duration;
            jobToPrint.setStatus("printing");
            setTimeout(() => {
                this.finishPrinting(jobToPrint);
            }, time * 100);
        }
    }

    //This function called when the job finish the printing process,
    // changes its status to finished, and after 2 seconds remove it from the queue
    @action
    finishPrinting(job: JobModel) {
        if (job != undefined) {
            job.setStatus("finished");
            setTimeout(() => {
                this.deleteJob(job.key);
            }, 2000);
        }
    }

    //Move current jop up or down
    @action
    moveJob(key: string, isUp?: boolean) {
        let jobToMove = this.jobsToPrint.find(job => job.key === key);
        if (jobToMove != undefined) {
            if (jobToMove.status === 'printing') {
                alert("You cannot move the printing job");
            }
            else {
                let index: number = this.jobsToPrint.lastIndexOf(jobToMove);
                let newIndex: number = -1;
                let allowToReplace: boolean = false;
                //Move the job up
                if (isUp) {
                    if (index === 1)
                        alert("You cannot move the printing job");
                    else {
                        newIndex = index - 1;
                        allowToReplace = true;
                    }
                }
                else {
                    if (index === this.jobsToPrint.length - 1)
                        alert("It's the last job");
                    else {
                        newIndex = index + 1;
                        allowToReplace = true;
                    }
                }
                if (allowToReplace) {
                    let jobToReplace: JobModel = this.jobsToPrint[newIndex];
                    this.jobsToPrint[newIndex] = jobToMove;
                    this.jobsToPrint[index] = jobToReplace;
                }
            }
        }

    }
}