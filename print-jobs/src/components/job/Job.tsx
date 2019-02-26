import * as React from 'react';
import { JobModel } from './JobModel';
import { observer } from 'mobx-react';
import './Job.css';

type Props = {
    model: JobModel;
    deleteJob(name: string): void;
    moveUp(name: string): void;
    moveDown(name: string): void;
}

@observer
export class Job extends React.Component<Props>{

    deleteJob = () => {
        const { name } = this.props.model;
        this.props.deleteJob(name);
    }

    moveUp = () => {
        const { name } = this.props.model;
        this.props.moveUp(name);
    }

    moveDown = () => {
        const { name } = this.props.model;
        this.props.moveDown(name);
    }

    render() {
        const { name, duration, status, startTime, endTime } = this.props.model;
        const buttonValue: string = this.props.model.status === 'printing' ? 'Cancel' : 'Delete';
        const toDisplay: string = "Name: " + name + " Status: " + status + " Start time: " + startTime + " End time: " + endTime;
        return (
            <div className='job'>
                <p> {toDisplay} </p>
                <button className='delete-button' onClick={this.deleteJob}> {buttonValue} </button>
                <p><i className="up" onClick={this.moveUp}></i></p>
                <p><i className="down" onClick={this.moveDown}></i></p>
            </div>
        )
    }
}