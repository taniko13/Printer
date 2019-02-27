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
        let num: number = event.target.value;
        if (isNaN(num))
            alert("Only numbers");
        else
            this.duration = event.target.value;
    }

    onSaveClick = () => {
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
                    <p>seconds</p>
                </div>
                <div>
                    <button className='create-button' onClick={this.onSaveClick}>Save</button>
                    <button className='create-button' onClick={onCancel}> Cancel</button>
                </div>
            </div>
        )
    }
}