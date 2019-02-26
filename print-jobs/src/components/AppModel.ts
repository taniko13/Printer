import { JobModel } from "./job/JobModel";
import { observable, action } from 'mobx';

export class AppModel {
    @observable isAddNew: boolean;
    @observable jobsToPrint: JobModel[];

    constructor() {
        this.isAddNew = false;
        this.jobsToPrint = [new JobModel("first", 120),
        new JobModel("second", 240),
        new JobModel("third", 90)];
    }

    //Open the CreateJob component when we want to add a new job. 
    //Or remove the component from the DOM.
    @action
    shouldNewJob(add: boolean) {
        this.isAddNew = add;
    }

    //Creates a new job model 
    createNewJob(name: string, duration: number) {
        this.isAddNew = false;
        let job: JobModel = new JobModel(name, duration);
        if (job != null) {
            this.addNewJob(job);
        }
    }

    //Adds the new job to the queue
    @action
    addNewJob(job: JobModel) {
        this.jobsToPrint.push(job);
    }

    //Delete the job from the queue, only if the status of job isn't printing
    @action
    deleteJob(name: string) {
        if (this.jobsToPrint.find(job => job.name === name && job.status === 'printing')) {
            alert('The job is at printing process, you cannot delete it');
        }
        else {
            this.jobsToPrint = this.jobsToPrint.filter(job => (job.name !== name));
        }

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
                this.deleteJob(job.name);
            }, 2000);
        }
    }

    //Move current jop up or down
    @action
    moveJob(name: string, isUp?: boolean) {
        let jobToMove = this.jobsToPrint.find(job => job.name === name);
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

    findJobByName(job: JobModel, name: string): boolean {
        return job.name === name;
    }
}