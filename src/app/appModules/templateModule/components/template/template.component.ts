import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Field } from '@field/classes/Field';
import { FieldService } from '@field/services/field.service';
import { Utilities } from '@share/Utilities';
import { modalInput } from '@share/classes/modalInput';
import { statusApiResult } from '@share/classes/statusApiResult';
import { AlertDialogComponent } from '@share/components/alert-dialog/alert-dialog.component';
import { PdfConverterService } from '@share/services/pdf-converter-service';
import { Step } from '@step/classes/Step';
import { StepService } from '@step/services/step.service';
import { document } from '@template/classes/document';
import { documentFields } from '@template/documentFields';
import { TemplateService } from '@template/services/template.service';
import { StepDocument } from '@template/stepDocument';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit,AfterViewInit{

  documents:Array<document>;
  dialogData:statusApiResult;
  fields:Array<Field>;
  steps:Array<Step>
  @ViewChild('dialog') alertDialog:AlertDialogComponent;

  constructor(private tempSv:TemplateService,
    private htm2PdfSv:PdfConverterService,
    private fdSv:FieldService,
    private docSv:TemplateService,
    private stepSv:StepService){

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
        if(data.result.success){
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
        if(data.result.success){
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
        if(data.result.success){
          this.documents = data.items as Array<document>;
          this.documents.map(t=> {
            t.stepToShow = t.steps
            t.stepsId = t.steps.map(r=> {return r.stepFk});
          })
        }
        else{
          this.dialogData = data.result;
          this.alertDialog.open();
        }
      }
    })
  }
  changeStatus(step:StepDocument){
    step.active = !step.active
  }
  async onVisor(doc:document)
  {
    doc.imageUrl = await this.htm2PdfSv.generatePdfImage(doc.template)
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
        if(data.result.success){
          
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
