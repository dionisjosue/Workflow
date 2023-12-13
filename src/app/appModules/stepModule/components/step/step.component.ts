import { Component,ViewChild,AfterViewInit, ElementRef, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GenericResponse } from '@share/classes/GenericResponse';
import { CreateStepComponent } from '../createStep/create-step.component';
import { StepService } from '@step/services/step.service';
import { Step } from '@step/classes/Step';
import { stepFilter } from '@step/classes/stepFilter';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Area } from 'src/app/area/Area';
import { AreaService } from 'src/app/area/Services/area.service';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.css']
})
export class StepComponent implements OnInit{


  @ViewChild('createStepComponent') createStepCm: CreateStepComponent;

  active:boolean;

  steps:Array<Step>;
  areas:Array<Area>;
  form:FormGroup
  currentStep:Step;

  constructor(private sv: StepService,private md:NgbModal,
    private formBuild:FormBuilder,public svArea:AreaService){
    this.steps = new Array<Step>();

    this.form = formBuild.group({
      name:['',[Validators.required,Validators.maxLength(50),Validators.minLength(3)]],
      sla:[0,[Validators.required,Validators.min(0)]],
      areaFk:[0,Validators.required]
    })
  }

  get name(){
    return this.form.get('name');
  }
  get sla(){
    return this.form.get('sla');
  }
  get areafk(){
    return this.form.get('areaFk');
  }

  ngOnInit(): void {
    this.getSteps();
    this.getAreas();
  }

  getSteps(){
    this.sv.getData(new stepFilter()).subscribe({
      next:(data)=>{
        if(data.result.success){
          this.steps = data.items as Array<Step>;
        }
        else{
          //emit info message dialog;
        }
      },
      error:(err)=>{
        console.log(err);
        //EMIT DIALOG OF ERROR 
      }
    })
  }
  getAreas(){
    this.svArea.getData(null).subscribe({
      next:(data)=>{
          if(data.result.success){
            this.areas = data.items as Array<Area>;
          }
          else{
            //EMIT INFO DIALOG MESSAGE;
          }
      }
    })
  }
  findArea(id):Area{
    return this.areas.find(t=> t.id == id);
  }
  
  editModeFn(st:Step){
    this.currentStep = st;
    if(st.editMode){
      this.saveEditStep();
      st.editMode = !st.editMode;
    }
    else{
      st.editMode  = !st.editMode
      this.name.setValue(st.name);
      this.sla.setValue(st.sla);
      this.areafk.setValue(st.areaFk);
    }
  }

  removeStep(step:Step){
    step.active = false;
    var stp = new Array<Step>();
    stp.push(step);
    this.sv.editData(stp).subscribe({
      next:(value:GenericResponse<Step>)=>
      {
          if(value.result.success)
          {
            this.steps = this.steps.filter(t=> t.id != step.id);
          }
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  saveStep(event:Array<Step>){
    console.log(event);
    this.sv.saveData(event).subscribe({
      next:(value:GenericResponse<Step>)=>
      {
          if(value.result.success)
          {
            this.steps = value.items as Array<Step>;
            this.createStepCm.closeModal();
          }
      }
    })
  }
  editStep(step:Array<Step>){
    this.sv.editData(step).subscribe({
      next:(value:GenericResponse<Step>)=>{
        if(value.result.success && this.currentStep){
          console.log(value.items);
          this.currentStep.name = value.items[0].name
          this.currentStep.sla = value.items[0].sla
          this.currentStep.area = this.findArea(value.items[0].areaFk);

          //this.currentStep = null;

        }
      }
    })
  }
  saveEditStep(){
    if(this.form.valid){
      let step = this.form.value as Step;
      let data = new Array<Step>();
      step.id = this.currentStep.id;
      data.push(step);
      this.editStep(data);
    }
    else{
      this.form.markAllAsTouched();
    }
  }
  createStep(){
    this.createStepCm.openModal();
  }
  addArea(area:Area){
    this.areas.push(area);
  }
}
