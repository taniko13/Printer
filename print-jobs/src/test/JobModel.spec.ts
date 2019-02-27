import {JobModel} from '../components/job/JobModel';
import {expect} from 'chai';
import 'mocha';

describe('Job Model', () =>{
    let job: JobModel;

    beforeEach(function(){
        job = new JobModel("id","Mock","queued", 155);
    })

    it('Verify name', () =>{
        expect(job.name).to.equals("Mock");
    })

    it('Verify duration', () =>{
        expect(job.duration).to.equals(155);
    })

    it('Verify status', () =>{
        expect(job.status).to.equals('queued');
    })

    it('Verify changing status', () =>{
        job.setStatus('printing');
        expect(job.status).to.equals('printing');
    })
});