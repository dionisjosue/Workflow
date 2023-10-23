import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { modalInput } from 'src/app/alert-dialog/modalInput';
import { Step } from 'src/app/step/Classes/Step';
import { StepService } from 'src/app/step/Services/step.service';
import { AttachmentService } from '../../services/attachment.service';
import { ShareDataService } from 'src/app/Commons/share-data.service';
import { map } from 'rxjs';
import { AlertDialogComponent } from 'src/app/alert-dialog/alert-dialog.component';
import { Attachment } from '../../classes/Attachment';
import { Router } from '@angular/router';
import { AttachmentSteps } from '../../classes/AttachmentSteps';
import { Field } from 'src/app/field/classes/Field';
import { FieldService } from 'src/app/field/services/field.service';
import { FieldFilter } from 'src/app/field/classes/FieldFilter';
import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
  selector: 'app-create-attachment',
  templateUrl: './create-attachment.component.html',
  styleUrls: ['./create-attachment.component.css']
})
export class CreateAttachmentComponent implements OnInit{

  form:FormGroup;
  steps:Array<Step>;
  fields:Array<Field>
  dialogInput:modalInput;
  extensions:Array<{name:'',id:''}>;
  @ViewChild('dialog')dialog:AlertDialogComponent;
  @ViewChild('stepsAttac')stepAttach:NgSelectComponent;



  constructor(private fb:FormBuilder,
    private stSv:StepService,private attSv:AttachmentService,
    private shareData:ShareDataService, private nav:Router,
    private fdSv:FieldService){
    this.form = fb.group({
      attachment:fb.array([])
    })
    this.addRow();
    //this.addAttachmentStep({id:0});


  }
  get getAttachs(){
    return this.form.get('attachment') as FormArray;
  }
  getAttachSteps(index?:number){
    let r =  this.getAttachs.controls[index].get('attachmentSteps') as FormArray
    return r;
  }

  ngOnInit(): void {
    this.getSteps();
    this.getExtensions();
    this.getFields();
  }
  addRow(){
    
      let row = this.fb.group({
      name:['',Validators.required],
      description:['',null],
      tooltip:['',null],
      acceptExtensions:[[],Validators.required],
      attachmentSteps:this.fb.array([]),
      attachStep:[Array<number>,null]
    });

    this.getAttachs.push(row);

  }

  addAttachmentStep(event,index)
  {
    console.log(event);
    let itm = event[event.length - 1]
     let attaStep = this.fb.group({
        stepFk:[itm.id,null],
        attachmentFk:[0,null],
        isRequired:[false,null],
        isCheckList:[false,null],
        field_fk:[0,null],
        name:[itm.name,null],
        area:[itm.area?.name,null]

     })
     this.getAttachSteps(index).push(attaStep);
  }
  removeStep(event,index){
    this.getAttachSteps(index).removeAt(event.index);
  }
  removeAll(event,index){
    this.getAttachSteps(index).clear();
  }
  deleteAttach(index,idxAtt){
   let attachSt =  this.getAttachSteps(idxAtt);
   attachSt.removeAt(index);
   var value = attachSt.value as Array<any>;
   let arr = value.map(t=> {
      return t.stepFk
   });

   this.getAttachs.controls[idxAtt].get('attachStep').patchValue(arr);


    

  }


  deleteItem(i){
    this.getAttachs.removeAt(i);
  }
  getExtensions(){
    this.shareData.getExtensions().subscribe({
      next:(data)=>{
        this.extensions = data.extensions.map(t=> {
          return {name:t.name,id:t.name}
        });
      },
      error:(err)=>{
        this.dialogInput = new modalInput('alertId',modalInput.getDataTitleError,'Ha ocurrido un error en el sistema (VER ERROR) ' + JSON.stringify(err),true);
        this.dialog.open();
      }
    })
  }

  getSteps(){
    this.stSv.getData(null).subscribe({
      next:(data)=>{
        if(data.success){
          this.steps = data.items as Array<Step>;
        }
      },
      error:(err)=>{
        this.dialogInput = new modalInput('alertId',modalInput.getDataTitleError,'Ha ocurrido un error en el sistema (VER ERROR) ' + JSON.stringify(err),true);
        this.dialog.open();
      }
    })
  }

  getFields(){
    var ft = new FieldFilter();
    ft.AttachmentField = true;
    this.fdSv.getData(ft).subscribe({
      next:(data)=>{
        if(data.success){
          this.fields = data.items as Array<Field>;
        }
      },
      error:(err)=>{
        this.dialogInput = new modalInput('alertId',modalInput.getDataTitleError,'Ha ocurrido un error en el sistema  (VER ERROR) ' + JSON.stringify(err),true);
        this.dialog.open();
      }
    })
  }

  onCloseAlert(event:modalInput){
    if(!event.error){
      this.nav.navigate(['../Adjuntos']);
    }
  }

  saveForms(){
    let data= this.getAttachs.value as Array<any>;
    console.log(data);
    //let arry = data.acceptExtensions.map(t=>{ return t.toString()});
    let dataSave = data.map(data => {
      return new Attachment(data.name,data.description,data.tooltip,
        data.acceptExtensions,data.attachmentSteps as Array<AttachmentSteps>);
    })

    this.attSv.saveData(dataSave).subscribe({
      next:(data)=>{
        if(data.success){
          this.dialogInput = new modalInput("alertId","DATOS GUARDADOS!","Los campos se han guardado");
          this.dialog.open();
        }

      },
      error:(err)=>{
        this.dialogInput = new modalInput('alertId',modalInput.getDataTitleError,'Ha ocurrido un error en el sistema (VER ERROR) ' + JSON.stringify(err),true);
        this.dialog.open();
      }
    })

  }
}
