import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { apiConfiguration } from '../createApiConfig/create-api-config/apiConfiguration';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConditionalFields } from '@conditional/classes/ConditionalFields';
import { apiConditionals } from './apiConditionals';
import { ApiConditionalService } from '../../services/api-conditional.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { lisItem } from '@share/components/list-menu/listItem';
import { FieldService } from 'src/app/appModules/fieldModule/services/field.service';
import { Step } from '@step/classes/Step';
import { Form } from '@form/classes/Form';
import { Field } from '@field/classes/Field';
import { Flow } from '@flow/classes/Flow';
import { ShareDataService } from '@share/services/share-data.service';
import { StepService } from '@step/services/step.service';
import { FormService } from '@form/services/form.service';
import { FlowService } from '@flow/services/flow.service';

@Component({
  selector: 'app-conditional-api',
  templateUrl: './conditional-api.component.html',
  styleUrls: ['./conditional-api.component.css']
})
export class ConditionalApiComponent implements OnInit
{
  api:apiConfiguration;
  form:FormGroup;
  steps:Array<Step>;
  formularios:Array<Form>;
  fields:Array<Field>;
  flows:Array<Flow>;
  eventList:Array<lisItem>;
  conditionals:Array<apiConditionals>;
  @ViewChild('conditional') modal:ElementRef;

  constructor(private shareDt:ShareDataService,
    private fb:FormBuilder,private stepSv:StepService,
    private formSv:FormService,private fdSv:FieldService,
    private flSv:FlowService,private apiSv:ApiConditionalService,
    private modalSv:NgbModal)
    {
      this.form = fb.group({
        name:['',Validators.required],
        apiName:['',null],
        stepEvent:[-1,null],
        steps:[Array<number>,null],
        fieldEvent:[-1,null],
        fields:[Array<number>,null],
        flowEvent:[-1,null],
        flows:[Array<number>,null],
        formEvent:[-1,null],
        forms:[Array<number>,null],
        apiConfigurationFk:[0,null],
        orderId:[0,null],
        condFieldForm:fb.group({
          conditionalFields:fb.array([])
        })
      })
      this.eventList = new Array<lisItem>();

  }
  openModal(apiConf:apiConfiguration){
    console.log("probando")
    this.modalSv.open(this.modal,{
        size:'xl',
        backdrop:'static',
        animation:true
    });
    this.api = apiConf;
    if(this.conditionals.length == 0){
      this.eventList = new Array<lisItem>();
      this.eventList.push(new lisItem('',0,true));
      this.addConditionalField(0);
      this.shareDt.updateSharedData(this.eventList);
    }
    else{
      this.fillForm();
    }
  }
  closeModal(){
    this.modalSv.dismissAll();
  }
  get getConditional()
  {
    return this.getChildForm.get('conditionalFields') as FormArray;
  }
  get getChildForm()
  {
    return this.form.get("condFieldForm") as FormGroup;
  }
  fillForm()
  {
    this.setForm(0);
    this.eventList = this.conditionals.map((t,index)=> new lisItem(t.name,index,false));

    this.eventList[0].selected = true;
    this.shareDt.updateSharedData(this.eventList);
  }
  ngOnInit(): void {
    this.shareDt.sharedData$.subscribe(t=>{
      console.log(t);
      this.api = t;

      if(this.api != null && this.api != undefined && this.api.apiConditionals.length > 0){
        this.api.apiConditionals.map((t,idx)=> {
          this.eventList.push(new lisItem(t.name,idx,false));
          if(idx == 0)
          {
            t.conditionals.map((k,idk)=> this.addConditionalField(idk,k))
          }
       })
        this.conditionals = this.api.apiConditionals;
        this.eventList[0].selected = true;
        this.form.get('apiConfigurationFk').setValue(this.api.id);
        this.form.get('apiName').setValue(this.api.name);
        this.setForm(0);
      }
      else{
        this.eventList.push(new lisItem('',0,true))
      }
      this.shareDt.updateSharedData(this.eventList);
    });
    this.getFields();
    this.getForms();
    this.getSteps();
    this.getFlows();
  }
  setForm(idx:number)
  {
    let cond = this.conditionals[idx];
    this.form.reset();
    this.getConditional.clear();
    this.getChildForm.get('conditionalFields').patchValue(this.conditionals[idx]);
    this.form.get('orderId').patchValue(idx);
    if(cond.apiConditionalSteps.length > 0)
    {
      let steps = cond.apiConditionalSteps.map((t)=>{return t.stepFk});
      this.form.patchValue({stepEvent:cond.apiConditionalSteps[0].eventType,steps:steps});
    }
    if(cond.apiConditionalForms.length > 0)
    {
      let forms = cond.apiConditionalForms.map((t)=>{return t.formFk});
      this.form.patchValue({stepEvent:cond.apiConditionalForms[0].eventType,forms});
    }
    if(cond.apiConditionalFields.length > 0)
    {
      let fields = cond.apiConditionalFields.map((t)=>{return t.fieldFk});
      this.form.patchValue({stepEvent:cond.apiConditionalFields[0].eventType,fields});
    }

    cond.conditionals.map((t,idx)=> {
      this.addConditionalField(idx,t);
    });
    
  }
  addConditionalField(idx?:number,entity?:ConditionalFields)
  {
    let cond:FormGroup
    if(entity != null && entity != undefined){
       cond = this.fb.group({
        fieldFk:[entity.fieldFk,Validators.required],
        comparisonSign:[entity.comparisonSign,Validators.required],
        fieldToCompareFk:[entity.fieldToCompareFk,null],
        expectedValue:[entity.expectedValue,null],
        order:[idx,Validators.required],
        nextLogicalOperator:[entity.nextLogicalOperator,null],
        prevVal:[entity.nextLogicalOperator,null],
        id:[entity.id,null],
        apiConditionalFk:[entity.apiConditionalFk]
      })
    }
    else{
       cond = this.fb.group({
        fieldFk:[0,Validators.required],
        comparisonSign:[0,Validators.required],
        fieldToCompareFk:['',null],
        expectedValue:[null,null],
        order:[idx,Validators.required],
        nextLogicalOperator:['',null],
        check:[false,null],
        prevVal:['',null],
        id:[0,null]
      })
    }
 
      cond.get('nextLogicalOperator').valueChanges.subscribe((data)=>{
        this.onChangeData(idx,data)
     });
    this.getConditional.push(cond);
    this.shareDt.updateSharedData(this.getConditional);
  }
  onChangeData(idx:number,data){
    let id = idx + 1;
    let itm = this.getConditional.at(idx);

    let previousVal = itm.get('prevVal').value;
    itm.get('prevVal').setValue(data);

    if(previousVal == '')
    {
      this.addConditionalField(id);
    }
    else if(data == ''){
      this.getConditional.removeAt(id);
      this.shareDt.updateSharedData(this.getConditional);
    }
  }
  getFields(){
    this.fdSv.getData(null).subscribe({
      next(data){
        if(data.result.success){
          this.fields = data.items as Array<Field>;
        }
      },
      error(err){

      }
    })
  }
  getForms(){
    this.formSv.getData(null).subscribe({
      next(data){
        if(data.result.success){
          this.fields = data.items as Array<Form>;
        }
      },
      error(err){
      }
    })
  }
  getFlows(){
    this.flSv.getData(null).subscribe({
      next(data){
        if(data.result.success){
          this.fields = data.items as Array<Flow>;
        }
      },
      error(err){
      }
    })
  }
  getSteps(){
    this.stepSv.getData(null).subscribe({
      next(data){
        if(data.result.success){
          this.fields = data.items as Array<Step>;
        }
      },
      error(err){
      }
    })
  }
  
  addStep(event){

  }
  addForm(event){

  }
  addField(event){

  }
  addFlow(event){

  }
  insertToCond(){
    let data = this.form.value;
    let exists=(this.api.apiConditionals.length -1)>= data.orderId;
    if(exists)
    {
      this.api.apiConditionals[data.orderId] = data;
    }
    else
    {
      this.api.apiConditionals.push(data);
    }
  }
  addCond(){
      this.insertToCond();
      this.form.reset();
      let nextId = this.api.apiConditionals.length;
      this.eventList.map(t=> t.selected = false)
      this.eventList.push(new lisItem('',nextId, true))
      this.shareDt.updateSharedData(this.eventList);
      this.form.get('orderId').setValue(nextId);
      this.getConditional.clear();
      this.addConditionalField(0);
  }
  selectedConditional(event){
    let dt = this.form.value;
    dt.conditionalFields = dt.condFieldForm.conditionalFields; 
    if(dt.orderId > this.conditionals.length - 1)
      this.conditionals.push(dt);
    else
      this.conditionals[dt.orderId] = dt;
    if(event.id >= 0)
    {
      this.setForm(event.id);
    }
  }
  saveData(){
    this.insertToCond();

    this.apiSv.saveData(this.conditionals).subscribe({
      next(data)
      {
          if(data.result.success){
            this.closeModal();
          }
      },
      error(err){

      }
    })
  }


}
