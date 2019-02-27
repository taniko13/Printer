import * as React from "react";
import { AppModel } from './AppModel';
import { Job } from "./job/Job";
import { observer } from 'mobx-react';
import { CreateJob } from './createJob/CreateJob';

import './App.css';

type Props = {
  appModel: AppModel;
}

@observer
export class App extends React.Component<Props>{
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    this.props.appModel.printJobs();
  }

  componentDidUpdate() {
    this.props.appModel.printJobs();
  }

  componentWillMount() {
    // axios.get('http://localhost:8080/RESTfulCRUD/rest/jobs')
    //   .then(response => console.log(response))
    //   .catch(error => console.log( error))
  }

  createNewJob = () => {
    this.props.appModel.shouldNewJob(true);
  }

  cancelNewJob = () => {
    this.props.appModel.shouldNewJob(false);
  }

  addNewJob = (name: string, duration: number) => {
    this.props.appModel.createNewJob(name, duration);
  }

  deleteJob = (id: string) => {
    this.props.appModel.deleteJob(id);
  }

  moveJobUp = (name: string) => {
    this.props.appModel.moveJob(name, true);
  }

  moveJobDown = (name: string) => {
    this.props.appModel.moveJob(name);
  }

  render() {
    let comp = this.props.appModel.isAddNew ?
      <div><CreateJob onSave={this.addNewJob} onCancel={this.cancelNewJob} />  </div> : null;
    const jobs = this.props.appModel.jobsToPrint;
    return (
      <div className="App">
        <div className="App-header">
          <h1>Jobs to print </h1>
        </div>
        <div>
          <button className='add-button' onClick={this.createNewJob}>Add new Job</button>
          {comp}
        </div>
        <div>
          {jobs.map(job => <Job key={job.name} model={job} deleteJob={this.deleteJob} moveUp={this.moveJobUp} moveDown={this.moveJobDown}></Job>)}
        </div>
      </div>
    );
  }
}