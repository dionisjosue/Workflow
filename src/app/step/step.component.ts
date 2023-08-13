import { Component,ViewChild } from '@angular/core';
import { Step } from './Classes/Step';
import { StepService } from './Services/step.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CreateStepComponent } from './create-step/create-step.component';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.css']
})
export class StepComponent {


  @ViewChild('createStepModal') createModalStep: NgbModalRef;

  constructor(private sv: StepService,private md:NgbModal){

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
