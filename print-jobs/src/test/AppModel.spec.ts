import {AppModel} from '../components/AppModel';
import {expect} from 'chai';
import 'mocha';
import { JobModel, IJobModel } from '../components/job/JobModel';

describe('App Model', () => {
    let appModel: AppModel;
    beforeEach(function(){
        appModel = new AppModel();
        let data: IJobModel[] = [{duration:'100',id:"bb12488e-cd4a-48b4-bf11-bf5ee18022bc","name":"print seventh","status":"queued"},
        {"duration":"100","id":"d3b12625-7573-4ec8-a831-47ac0617978a","name":"print eighth","status":"queued"},
        {"duration":"100","id":"f9154d34-f0a1-43d3-ba32-869420949bed","name":"print second","status":"queued"},
        {"duration":"100","id":"452a10ce-168b-4d84-ad76-cae661a282f4","name":"print fifth","status":"queued"},
        {"duration":"100","id":"234af8ae-6773-4ea7-ad46-fe5fa5b6183d","name":"print third","status":"queued"},
        {"duration":"100","id":"74a7de72-a2a7-4d75-8ada-2bf8707b7b97","name":"print fourth","status":"queued"},
        {"duration":"100","id":"a1a6f722-c5f2-4961-88e0-c0e08db1ff61","name":"print sixth","status":"queued"},
        {"duration":"100","id":"9c462831-497e-43e2-a082-8e116d1c31c7","name":"print first","status":"queued"},
        {"duration":"6000","id":"9c462831-497e-43e2-a082-8e116d1c31uh","name":"new job","status":"queued"},
        {"duration":"6000","id":"9c465431-497e-43e2-a082-8e116d1c31c7","name":"new job","status":"queued"}];
        appModel.setJobsToPrint(data)
    })
    it('Verify new app model', () =>{
        expect(appModel.isAddNew).to.be.false;
        expect(appModel.jobsToPrint.length).equals(10);
    } )

    it('Verify add new job', () =>{
        appModel.shouldNewJob(true);
        expect(appModel.isAddNew).to.be.true;
    })

    it('Verify create new job', () =>{
        appModel.createNewJob("new job", 6000);
        expect(appModel.isAddNew).to.be.false;
        expect(appModel.jobsToPrint.length).equals(11);
    } )

    it('Verify delete job', () =>{
        appModel.deleteJob("d3b12625-7573-4ec8-a831-47ac0617978a");
        expect(appModel.isAddNew).to.be.false;
        expect(appModel.jobsToPrint.length).equals(9);
    } )

    it('Verify print job', () =>{
        let jobToPrint: JobModel = appModel.jobsToPrint[0];
        appModel.printJob(jobToPrint);
        expect(jobToPrint.status).to.equals('printing');
    } )

    it('Verify move job up', () =>{
        appModel.moveJob('9c462831-497e-43e2-a082-8e116d1c31c7', true);
        expect(appModel.jobsToPrint[6].key).to.equals('9c462831-497e-43e2-a082-8e116d1c31c7');
    } )

    it('Verify move job down', () =>{
        appModel.moveJob('d3b12625-7573-4ec8-a831-47ac0617978a');
        expect(appModel.jobsToPrint[2].key).to.equals('d3b12625-7573-4ec8-a831-47ac0617978a');
    } )
});