import { Component,Output,EventEmitter} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Area } from 'src/app/area/Area';
import { StepService } from '../Services/step.service';
import { Step } from '../Classes/Step';
import { AreaService } from 'src/app/area/Services/area.service';

@Component({
  selector: 'app-create-step',
  templateUrl: './create-step.component.html',
  styleUrls: ['./create-step.component.css']
})
export class CreateStepComponent  {


  @Output()onSave:EventEmitter<Array<Step>> = new EventEmitter<Array<Step>>();
  form:FormGroup;
  areas:Area[];
  steps:Step[];

  constructor(private fb: FormBuilder,private sv:StepService,
    private svArea:AreaService){
    this.form =this.fb.group({
      rows:this.fb.array([])
    })
    this.createRow();
  }

  get rows(){
    return this.form.get("rows") as FormArray;
  }

  public createRow() 
  {
    const rows = this.rows; 
    var row = this.fb.group({
      name: ['',Validators.required],
      areaFk:[0,Validators.required],
      sla:[0,null]
    });
    rows.push(row, { emitEvent: true });
  }
  getAreas(){
    this.svArea.getArea().subscribe({
      next:(data)=>{
          if(data.success){
            this.areas = data.items as Array<Area>;
          }
          else{
            //EMIT INFO DIALOG MESSAGE;
          }
      },
      error:(err)=>
      {
        console.log(err);
        //emit error or info message on dialog
      }
    })
  }
  public removeRow(index){
    if(this.rows.length > 1)
      this.rows.removeAt(index);
  }
  addAreaOnClick(namefl:string){
    var area = new Area();
    area.name = namefl;
    area.description = "";
    this.svArea.saveArea(area).subscribe({
      next:(data)=>{
        if(data.success){
          this.areas = this.areas.concat(data.items as Array<Area>);
        }
      },
      error:(err)=>{

      }
    })
  }
  saveSteps(){
    console.log(this.form.value);

    this.onSave.emit(this.steps);
  }

}
