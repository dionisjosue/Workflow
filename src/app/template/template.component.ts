import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { document } from './Classes/document';
import { TemplateService } from './Services/template.service';
import { modalInput } from '../alert-dialog/modalInput';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { StepDocument } from './Classes/stepDocument';
import { PdfConverterService } from '../Commons/pdf-converter-service';
import { Field } from '../field/classes/Field';
import { FieldService } from '../field/services/field.service';
import { Step } from '../step/Classes/Step';
import { StepService } from '../step/Services/step.service';
import { Utilities } from '../Commons/classes/Utilities';
import { documentFields } from './Classes/documentFields';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit,AfterViewInit{

  documents:Array<document>;
  dialogData:modalInput;
  fields:Array<Field>;
  steps:Array<Step>
  @ViewChild('dialog') alertDialog:AlertDialogComponent;

  constructor(private tempSv:TemplateService,
    private htm2PdfSv:PdfConverterService,
    private fdSv:FieldService,
    private docSv:TemplateService,
    private stepSv:StepService){

    this.dialogData = new modalInput('dialogId','','',false);
  }
  ngAfterViewInit(): void {
  }
  ngOnInit(): void {
    this.getDocuments();
    this.getFields();
    this.getSteps();
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
  getSteps(){
    this.stepSv.getData(null).subscribe({
      next:(data)=>{
        console.log(data);
        if(data.success){
          this.steps = data.items as Array<Step>;
        }
      },
      error:(err)=>{

      }
    })
  }

  getDocuments(){
    this.tempSv.getData(null).subscribe({
      next:(data)=>{
        if(data.success){
          this.documents = data.items as Array<document>;
          console.log(this.documents);
          this.documents.map(t=> {
            t.stepToShow = t.steps
            t.stepsId = t.steps.map(r=> {return r.stepFk});
          })
        }
        else{
          this.dialogData = new modalInput('error',modalInput.getDataTitleError,'Ha ocurrido un error '+ data.message,true);
          this.alertDialog.open();
        }
      },
      error:(err)=>{
        console.log(err);
        this.dialogData = new modalInput('error',modalInput.getDataTitleError,'Ha ocurrido un error ' + JSON.stringify(err),true);
        this.alertDialog.open();

      }
    })
  }
  changeStatus(step:StepDocument){
    step.active = !step.active
  }
  async onVisor(doc:document)
  {
    console.log("hola");
  //  if(doc.templateChanged || doc.templateChanged == undefined){
      doc.imageUrl = await this.htm2PdfSv.generatePdfImage(doc.template)
    //}
    doc.showSteps = false; 
    doc.showVisor = !doc.showVisor
    doc.templateChanged = false;
  }
  editMode(doc){
    doc.editMode = !doc.editMode
  }
  onChangeField(event,field:documentFields){
     field.fieldFkPrev = field.fieldFk;
  }
  saveData(doc:document)
  {
    console.log(doc.template);

    let dataTmpl = doc.fields.map(t=> {
      return {['fld_'+t.fieldFkPrev]: '[fld_'+t.fieldFk+']'}
    });
    
    dataTmpl.map(r=> {
      doc.template = Utilities.replaceWords(doc.template,r);
    })

    console.log(doc.template);

    let data = new Array<document>();
    data.push(doc);
    this.docSv.editData(data).subscribe({
      next:(data)=>{
        if(data.success){
          
        }
      },
      error:(err)=>{

      },
      complete() {
        doc.editMode = !doc.editMode;
      },
    })
  }
  addToList(event:Step,doc:document){
    console.log(event);
    let exist = doc.steps.find(t=> t.stepFk == event.id);
    if(exist){
      exist.active=true;
    }
    else{
      let st = new StepDocument(event.id,doc.id,event);
      doc.steps.push(st);
    }
    doc.stepToShow = doc.steps.filter(t=> t.active);


  }
  removeToList(event,doc:document)
  {
    let st = this.steps.at(event.index);
    let docSt = doc.steps.find(t=> t.stepFk == st.id);
    docSt.active = false;

    doc.stepToShow = doc.steps.filter(t=> t.active);


  }
  removeAll(doc:document){
    console.log('prueba');
    doc.steps = new Array<StepDocument>();

  }


  

}
