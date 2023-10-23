import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FlowStep } from '../flow-step/class/FlowStep';
import { FlowStepFilter } from '../flow-step/class/FlowStepFilter';
import { FlowStepService } from '../flow-step/services/flowStepService';
import { Field } from '../field/classes/Field';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Conditional } from './classes/Conditional';
import { ConditionalService } from './services/conditional.service';
import { SaveEntity } from '../Commons/classes/SaveEntity';
import { FieldService } from '../field/services/field.service';
import { lisItem } from '../Commons/list-menu/listItem';
import { ShareDataService } from '../Commons/share-data.service';
import { ConditionalFields } from './classes/ConditionalFields';

@Component({
  selector: 'app-createConditional',
  templateUrl: './createConditional.component.html',
  styleUrls: ['./createConditional.component.css']
})
export class ConditionalComponent implements OnInit,AfterViewInit{

  flowStep:FlowStep;
  form:FormGroup;
  steps:Array<FlowStep>;
  fields:Array<Field>;
  save:SaveEntity;
  conditionals:Array<Conditional>;
  items:Array<lisItem>

  @ViewChild("conditional")modal:ElementRef;


  constructor(private fb:FormBuilder,
    private stepSv:FlowStepService,
    private modalsv:NgbModal,
    private condSv:ConditionalService,
    private fdSv:FieldService,
    private shareDt:ShareDataService)
  {
    this.form = fb.group({
      referenceName:['',Validators.required],
      flowStepFk:[0,Validators.required],
      alternateFlowStepFk:[0,Validators.required],
      commentResult:['',null],
      childForm:fb.group({
        conditionalFields:fb.array([]),
      }),
      orderId:[0,null],
      id:[0,null]
    })
    this.save = new SaveEntity();
    this.conditionals = new Array<Conditional>();

    this.form.get('referenceName').valueChanges.subscribe(t=>{
      let idx = this.form.get('orderId').value as number;
      
      if( this.items != undefined && t != undefined && t.length > 0){
        let itm = this.items.find(r=> r.id == idx);
        if(itm != undefined )
        {
          itm.name = t;
          this.senData(this.items);
        }
      }

    })
  }
  get getForm(){
    return this.form.get('childForm') as FormGroup;
  }

  ngAfterViewInit(): void {
      this.getFields();
  }
  ngOnInit(): void 
  {
  }

  get getConditional():FormArray{
    return this.getForm.get('conditionalFields') as FormArray
  }

  senData(items:any){
    this.shareDt.updateSharedData(items);
  }

  onClose(){
    this.form.reset();
    this.getConditional.clear();
    this.modalsv.dismissAll();
  }

  open()
  {
    console.log("probando")
    this.modalsv.open(this.modal,{
        size:'xl',
        backdrop:'static',
        animation:true
    });
    if(this.conditionals.length == 0){
      this.items = new Array<lisItem>();
      this.items.push(new lisItem('',0,true));
      this.addConditionalField(0);
      this.shareDt.updateSharedData(this.items);
    }
    else{
      this.fillForm();
    }
  }
  setFormValues(index)
  {
    this.form.reset();
    this.getConditional.clear();
    this.form.patchValue(this.conditionals[index]);
    this.form.get('orderId').patchValue(index);
    this.conditionals[index].conditionalFields.map((t,idx)=> {
      this.addConditionalField(idx,t);
    });
  }
  fillForm()
  {
    this.setFormValues(0);
    this.items = Conditional.getListItem(this.conditionals);

    this.items[0].selected = true;
    this.senData(this.items);
  }
  setForm(event:lisItem)
  {
    let dt = this.form.value;
    dt.conditionalFields = dt.childForm.conditionalFields;
    if(dt.orderId > this.conditionals.length - 1)
      this.conditionals.push(dt);
    else
      this.conditionals[dt.orderId] = dt;
    if(event.id >= 0)
    {
      this.setFormValues(event.id);
    }
  }

  getFields(){
    this.fdSv.getData(null).subscribe({
      next:(data)=>{
        if(data.success){
          this.fields = data.items as Array<Field>;
        }
      },
      error:(err)=>{

      }
    })
  }
  addCond()
  {
    let data = this.form.value 
    data.conditionalFields = data.childForm.conditionalFields;
    data.flowStepFk = this.flowStep.id;
    let exists= this.conditionals.findIndex(t=> t.orderId == data.orderId);
    let nextId = this.conditionals.length;
   
    this.form.reset();
    if(exists >= 0 )
    {
      this.conditionals[exists] = data;
    }
    else
    {
      this.conditionals.push(data);
      nextId = data.orderId + 1;
    }
    this.items.map(t=> t.selected = false)
    this.items.push(new lisItem('',nextId, true))
    this.senData(this.items);
    this.form.get('orderId').setValue(nextId);
    this.getConditional.clear();
    this.addConditionalField(0);
  }
  getStep()
  {
    if(this.steps || this.steps == undefined || this.steps.length < 0 )
    {
      let filter = new FlowStepFilter();
      filter.flowFk = this.flowStep?.flowFk ?? 0;

      this.stepSv.getData(filter).subscribe({
        next:(data)=>{
          if(data.success){
            this.steps = data.items as Array<FlowStep>;
          }
        },
        error:(err)=>{

        }
      })
    }
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
        id:[entity.id,null]
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

  saveData(){
    let data = this.form.value;
    data.conditionalFields = data.childForm.conditionalFields;
    console.log(data);
    if(data.orderId > this.conditionals.length - 1)
      this.conditionals.push(data);
    else
      this.conditionals[data.orderId] = data
    ;
    this.conditionals.map(t=>{
      t.flowStepFk = this.flowStep.id;
      t.id = t.id ?? 0
      t.conditionalFields.map(r=> r.conditionalFk = t.id)
    });
    console.log(this.conditionals);
    this.save = new SaveEntity();
    this.condSv.saveData(this.conditionals).subscribe({
      next:(data)=>
      {
        if(data.success)
        {
          this.save.save = true;
          this.onClose();

        }
        else{
          this.save.save = false;
        }
      },
      error:(err)=>{
        this.save.isError = true;
        this.save.message = JSON.stringify(err);
      }
    })

  }

}
