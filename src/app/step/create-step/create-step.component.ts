import { Component,Output,EventEmitter, ViewChild, ElementRef,AfterViewInit} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Area } from 'src/app/area/Area';
import { StepService } from '../Services/step.service';
import { Step } from '../Classes/Step';
import { AreaService } from 'src/app/area/Services/area.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Alert } from 'src/app/Commons/classes/Alert';

@Component({
  selector: 'app-create-step',
  templateUrl: './create-step.component.html',
  styleUrls: ['./create-step.component.css']
})
export class CreateStepComponent implements AfterViewInit {


  @Output()onSave:EventEmitter<Array<Step>> = new EventEmitter<Array<Step>>();
  form:FormGroup;
  areas:Area[];
  steps:Step[];
  alert:Alert;
  
  @ViewChild('createStepModal')modal: ElementRef;
 

  constructor(private fb: FormBuilder,private sv:StepService,
    private svArea:AreaService, private md: NgbModal ){
    this.form =this.fb.group({
      rows:this.fb.array([])
    })
    this.createRow();
    var are= new Area();
    are.name ="sucursal";
    are.id = 1;
    this.areas = new Array<Area>();
    this.areas.push(are);
    this.alert = new Alert("info","",false,-1,false);
  }
  ngAfterViewInit(): void {
    this.getAreas();
  }

  get rows(){
    return this.form.get("rows") as FormArray;
  }
  openModal(){
    this.md.open(this.modal,{
      size:'lg',
      backdrop:'static',
      animation:true
    });
  }
  closeModal(){
    this.form.reset();
    this.rows.clear();
    this.createRow();
    this.md.dismissAll();
  }
  refreshAreas(){
    var tmp = this.areas;
    this.areas = new Array<Area>();
    this.areas = tmp.filter(t=> t.id > 0);
  }
  public checkArea(event,idx:number)
  {
    var name = event?.name ?? "";
    this.refreshAreas();
    var exists = this.areas.find(t=> t.name.toLowerCase().trim() == name.toLowerCase().trim())

    if(exists == null && name.length > 0){
      this.alert.index = idx;
      this.alert.show = true;
      this.alert.shwBtn = true;
      this.alert.message = "¿Esta seguro que desea GUARDAR el area " + name.toUpperCase() + "?"
      var area = new Area();
      area.name = name;
      area.active = true;
      area.id =0;
      area.idx = idx;
      this.areas.push(area);
    }
  }
  public saveArea(index:number){
    var areasToAdd = this.areas.filter(t=> t.id == 0 && t.idx == index);
    var self = this;
    this.svArea.saveData(areasToAdd).subscribe({
      next:(data)=>{
        if(data.success){
          this.areas = this.areas.filter(t=> t.id != 0);
          this.areas = this.areas.concat(data.items as Array<Area>);
          this.alert.shwBtn = false;
          this.alert.type = "success";
          this.alert.message = "AREAS GUARDADAS CORRECTAMENTE";
          var row = this.rows.at(index);
          row.get("areaFk").setValue(data.items[0].id);
        }
        else{
          this.alert.shwBtn = false;
          this.alert.type = "INFO";
          this.alert.message = data.message;
          // emit info message dialog
        }
        setTimeout(function(){
          self.alert.show = false
          self.alert.index = -1;
        },5000)

      },
      error:(err)=>{
        console.log(err);
        this.alert.type = "danger";
        this.alert.message = "HA OCURRIDO UN ERROR GUARDANDO EL AREA";
          // emit error dialog message;
      }
    })
  }
  public closeAlert(index:number){
    this.alert.index = -1;
    this.alert.show = false;
    var exists = this.areas.findIndex(t=> t.idx == index);
    if(exists > -1){
      this.areas.splice(exists,1);
    }
    this.refreshAreas();
    var row = this.rows.at(index);
    row.get("areaFk").setValue(-1);
    console.log(this.areas);
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
    this.svArea.getData(null).subscribe({
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
  saveSteps(){
    this.steps = this.form.value.rows as Step[];
    console.log(this.steps);
    /*this.steps.forEach(t=> {
      t.area = this.areas.find(r=> r.id == t.areaFk);
    })*/
    this.onSave.emit(this.steps);
  }

}
