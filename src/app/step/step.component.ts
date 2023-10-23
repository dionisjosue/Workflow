import { Component,ViewChild,AfterViewInit, ElementRef } from '@angular/core';
import { Step } from './Classes/Step';
import { StepService } from './Services/step.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CreateStepComponent } from './create-step/create-step.component';
import { stepFilter } from './Classes/stepFilter';
import { GenericResponse } from '../Commons/classes/GenericResponse';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.css']
})
export class StepComponent implements AfterViewInit{


  @ViewChild('createStepComponent') createStepCm: CreateStepComponent;

  constructor(private sv: StepService,private md:NgbModal){
    this.steps = new Array<Step>();
  }
  ngAfterViewInit(): void {
    this.sv.getData(new stepFilter()).subscribe({
      next:(data)=>{
        if(data.success){
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
  active:boolean;

  steps:Array<Step>;

  removeStep(step:Step){
    step.active = false;
    var stp = new Array<Step>();
    stp.push(step);
    this.sv.editData(stp).subscribe({
      next:(value:GenericResponse<Step>)=>
      {
          if(value.success)
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
          console.log(value);

          if(value.success)
          {
            this.steps = value.items as Array<Step>;
            this.createStepCm.closeModal();
          }
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  createStep(){
    this.createStepCm.openModal();
  }
}
