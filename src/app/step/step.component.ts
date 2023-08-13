import { Component,ViewChild,AfterViewInit } from '@angular/core';
import { Step } from './Classes/Step';
import { StepService } from './Services/step.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CreateStepComponent } from './create-step/create-step.component';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.css']
})
export class StepComponent implements AfterViewInit{


  @ViewChild('createStepModal') createModalStep: NgbModalRef;

  constructor(private sv: StepService,private md:NgbModal){

  }
  ngAfterViewInit(): void {
    this.sv.getSteps(null).subscribe({
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

  steps:Step[];

  createStep(){
    this.md.open(this.createModalStep,{
      size:'lg',
      backdrop:'static',
      animation:true
    });
  }
}
