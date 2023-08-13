import { Component, OnInit,AfterViewInit, OnDestroy} from '@angular/core';
import { Step } from '../step/Classes/Step';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { FlowStep } from '../flow/Classes/FlowStep';
import { Flow } from '../flow/Classes/Flow';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FlowFilter } from '../flow/Classes/FlowFilter';
import { FlowService } from '../flow/Services/flow.service';

@Component({
  selector: 'app-creat-edit-flow',
  templateUrl: './creat-edit-flow.component.html',
  styleUrls: ['./creat-edit-flow.component.css']
})
export class CreatEditFlowComponent implements OnInit,AfterViewInit,OnDestroy{

  form:FormGroup;

  Flow:Flow;
  flowFk:number;
  istoggle:boolean;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private fb: FormBuilder,private route: ActivatedRoute,
    private flowRp:FlowService){
    this.form = this.fb.group({
      rows:this.fb.array([]),
      flowName:['',Validators.required],
      productFk:[0,Validators.required],
      description:['',null]
    })
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  ngAfterViewInit(): void 
  {
    this.istoggle = true;

  }
  ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        this.flowFk = Number.parseInt(params.get('id'));
        console.log('Route Param ID:', this.flowFk);
        this.getFlow(this.flowFk);
      });
  }
  addSteps(){
    this.Flow.flowSteps.forEach(t=> {
      this.createRow(t);
    })
  }
  getFlow(id:number){
    if(id > 0)
    {
      var ft = new FlowFilter();
      ft.id = id;
      this.flowRp.getFlows(ft).subscribe(
        {
          next:(data)=>
          {
            if(data.success)
            {
              if(data.items.length > 0){
                this.Flow = data.items[0];
                this.initializeFlow();
                this.addSteps();
              }
              else
              {
                //REDIRECT TO MAIN PAGE OF FLOW WITH A MESSAGE (MAYBE A FRAGMENT)
                  //WIT THAT FLOW DO NOT EXISTS
              }
            }
            else{
              //a detailed message that a error has ocurred
            }
          },
          error:(err)=>{
            console.log(err);
            //MESSAGE ALERT
          }
        }
      )
    }
    else{
      this.createRow(null);
    }
  }

  get value(){
    return this.form.controls['flowName'].value ?? "NOMBRE DEL FLUJO";
  }

  getFlowSteps():FlowStep[]{
    var array = this.rows.controls.map((row:FormGroup)=>
    {
      return {
        referenceName: row.get('referenceName').value,
        comments: row.get('comments').value,
        stepFk:Number.parseInt(row.get('stepFk').value),
        nextFlowStepFk:Number.parseInt(row.get('nextFlowStepFk').value),
        flowFk:Number.parseInt(row.get('flowFk').value),
        step:null,
        flow:null
      }
    }) as Array<FlowStep>;

    return array;
  }
  toggle(){
    this.istoggle = !this.istoggle;
  } 
  saveFlow(){
    console.log(this.form.value);
  }
  private initializeFlow()
  {
    const data = {
      flowName: this.Flow.flowName,
      productFk: this.Flow.productFk,
      description: this.Flow.description
    };

    this.form.patchValue(data)
  }
  get rows(){
    return this.form.get('rows') as FormArray;
  }
  public createRow(model:FlowStep) 
  {
    const rows = this.rows; 
    this.form.get('rows') as FormArray;
    if(model== null){
      var row = this.fb.group({
        referenceName: ['',Validators.required],
        comments:['',null],
        stepFk:[0,Validators.required],
        nextFlowStepFk:[0,Validators.required],
        flowFk:[0,null]
      });
      rows.push(row, { emitEvent: true });

    }
    else{
      var row= this.fb.group({
        referenceName: [model.referenceName,Validators.required],
        comments:[model.comments,null],
        stepFk:[model.stepFk,Validators.required],
        nextFlowStepFk:[model.nextFlowStepFk,Validators.required],
        flowFk:[model.flowFk,Validators.required]
      });
      rows.push(row, { emitEvent: true });
    }
  }
  public removeRow(index){
    if(this.rows.length > 1)
      this.rows.removeAt(index);
  }


}
