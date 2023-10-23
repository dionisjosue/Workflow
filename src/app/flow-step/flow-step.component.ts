import { Component,AfterViewInit,Input } from '@angular/core';
import { StepService } from '../step/Services/step.service';
import { Step } from '../step/Classes/Step';
import { FlowStep } from './class/FlowStep';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ShareDataService } from '../Commons/share-data.service';

@Component({
  selector: 'app-flow-step',
  templateUrl: './flow-step.component.html',
  styleUrls: ['./flow-step.component.css']
})
export class FlowStepComponent implements AfterViewInit{
 

  istoggle:boolean;
  steps:Array<Step>;
  idx:number =0;
  @Input() flowSteps:Array<FlowStep>;
  formFlow:FormGroup;

  constructor(private svStep:StepService,private fb:FormBuilder,
    private shareService:ShareDataService){
    this.formFlow = this.fb.group({
      rows:this.fb.array([]),
    })
    this.istoggle = true;
    this.addSteps();

  }

  ngAfterViewInit(): void {
    this.getSteps();
  }

  get rows(){
    return this.formFlow.get('rows') as FormArray;
  }

  getSteps()
  {
    this.svStep.getData(null).subscribe(
      {
        next:(data)=>
        {
            if(data.success)
            {
              this.steps = data.items as Array<Step>;
            }
        },
        error:(err)=>{

        }
      })
  }
  addSteps()
  {
    if(this.flowSteps != null && this.flowSteps != undefined
      && this.flowSteps.length > 0)
    {
        this.flowSteps.forEach(t=> {
          this.createRow(t);
        })
    }
    else{
      this.createRow(null);
    }
   
  }
  public createRow(model:FlowStep) 
  {
    const rows = this.rows; 
    this.formFlow.get('rows') as FormArray;
    let row;
    if(model== null)
    {
      var self = this;
      this.idx++;
      row = this.fb.group({
        referenceName: ['',Validators.required],
        comments:['',null],
        stepFk:[0,Validators.required],
        NextFlowIdx:[0,Validators.required],
        flowFk:[0,null],
        idx:[self.idx,null],
        id:[0,null]
      });
    }
    else{
      row= this.fb.group({
        referenceName: [model.referenceName,Validators.required],
        comments:[model.comments,null],
        stepFk:[model.stepFk,Validators.required],
        NextFlowIdx:[model.nextFlowStepFk,Validators.required],
        flowFk:[model.flowFk,Validators.required],
        idx:[model.id,null],
        id:[model.id,null]
      });
    }
    row.valueChanges.subscribe((newRowData) => 
    {
       let step = this.formFlow.value.rows as FlowStep[];
       step = step.filter(t=> t.id >= 0);
       var current = step.find(t=> t.idx == newRowData.idx);
       if(current)
       {
          current.referenceName = newRowData.referenceName;
          current.NextFlowIdx = newRowData.NextFlowIdx;
          current.comments = newRowData.comments;
          current.stepFk = newRowData.stepFk;
          console.log(step);
       }
       this.shareService.updateSharedData(step) ;
    });
    rows.push(row, { emitEvent: true });

  }
  public removeRow(index){
    if(this.rows.length > 1)
    {
      var current = this.rows.at(index).get("idx").value
      var currentItems = this.rows.controls.filter(t=> t.get("NextFlowIdx").value == current);
      currentItems.forEach((t,idx) =>
      {
        const specificControl = t.get('NextFlowIdx') as FormControl;
        specificControl.setValue(0);
      })

      this.rows.removeAt(index);
      this.setItems();
    }
  }
 setItems(){
    this.flowSteps= this.formFlow.value.rows as FlowStep[];
    let idx = this.flowSteps.findIndex(t=> t.referenceName == "PASO FINAL");
    if(idx < 0){
      let genStep = new FlowStep();
      genStep.id = -1;
      genStep.NextFlowIdx = -1;
      genStep.referenceName = "PASO FINAL";
      this.flowSteps.push(genStep);
    }

    this.flowSteps = this.flowSteps.filter(t=> t.referenceName.length > 0);

    console.log(this.flowSteps);
  }
  toggle(){
    this.istoggle = !this.istoggle;
  } 

}
