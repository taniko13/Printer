import * as React from 'react';
import './CreateJob.css';

type Props = {
    onSave(name: string, duration: number): void;
    onCancel(): void;
}
export class CreateJob extends React.Component<Props>{
    name: string;
    duration: number;

    constructor(props: Props) {
        super(props);
        this.name = '';
        this.duration = NaN;
    }

    handleName = (event: any) => {
        this.name = event.target.value;
    }

    handleDuration = (event: any) => {
        this.duration = event.target.value;
    }

    onSaveClick = () => {
        console.log("Create Job: " + this.name + " " + this.duration);
        this.props.onSave(this.name, this.duration);
    }
    render() {
        const { onCancel } = this.props;
        return (
            <div className='create-new-job'>
                <div className='create-name'>
                <p> Name: </p>
                <input className='create-input' type="text" onChange={this.handleName} />
                </div>
                <div className='create-duratoin'>
                <p>Duration: </p>
                <input className='create-input' type="text" onChange={this.handleDuration} />
                </div>
                <div>
                    <button className='create-button' onClick={this.onSaveClick}>Save</button>
                    <button className='create-button' onClick={onCancel}> Cancel</button>
                </div>
            </div>
        )
    }
}