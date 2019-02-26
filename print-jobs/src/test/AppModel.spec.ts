import {AppModel} from '../components/AppModel';
import {expect} from 'chai';
import 'mocha';
import { JobModel } from '../components/job/JobModel';

describe('App Model', () => {
    let appModel: AppModel;
    beforeEach(function(){
        appModel = new AppModel();
    })
    it('Verify new app model', () =>{
        expect(appModel.isAddNew).to.be.false;
        expect(appModel.jobsToPrint.length).equals(3);
    } )

    it('Verify add new job', () =>{
        appModel.shouldNewJob(true);
        expect(appModel.isAddNew).to.be.true;
    })

    it('Verify create new job', () =>{
        appModel.createNewJob("new job", 6000);
        expect(appModel.isAddNew).to.be.false;
        expect(appModel.jobsToPrint.length).equals(4);
    } )

    it('Verify delete job', () =>{
        appModel.deleteJob("second");
        expect(appModel.isAddNew).to.be.false;
        expect(appModel.jobsToPrint.length).equals(2);
        expect(appModel.jobsToPrint[0].name).equals("first");
        expect(appModel.jobsToPrint[1].name).equals("third");
    } )

    it('Verify print job', () =>{
        let jobToPrint: JobModel = appModel.jobsToPrint[0];
        appModel.printJob(jobToPrint);
        expect(jobToPrint.status).to.equals('printing');
    } )

    it('Verify move job up', () =>{
        appModel.moveJob('third', true);
        expect(appModel.jobsToPrint[2].name).to.equals('second');
    } )

    it('Verify move job down', () =>{
        appModel.moveJob('second');
        expect(appModel.jobsToPrint[2].name).to.equals('second');
    } )
});