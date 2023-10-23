import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Editor, Toolbar,toDoc} from 'ngx-editor';
import { PdfConverterService} from 'src/app/Commons/pdf-converter-service';
import { ShareDataService } from 'src/app/Commons/share-data.service';
import { AlertDialogComponent } from 'src/app/alert-dialog/alert-dialog.component';
import { modalInput } from 'src/app/alert-dialog/modalInput';
import { lisItem } from 'src/app/Commons/list-menu/listItem';
import { Step } from 'src/app/step/Classes/Step';
import { StepService } from 'src/app/step/Services/step.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CustomOption, QuillService} from 'ngx-quill';
import { Utilities } from 'src/app/Commons/classes/Utilities';
import { FieldService } from 'src/app/field/services/field.service';
import { Field } from 'src/app/field/classes/Field';
import { document} from '../Classes/document';
import { documentFields } from '../Classes/documentFields';
import { TemplateService } from '../Services/template.service';
import { ModalVisualizerComponent } from 'src/app/Commons/modal-visualizer/modal-visualizer.component';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-create-template',
  templateUrl: './create-template.component.html',
  styleUrls: ['./create-template.component.css']
})
export class CreateTemplateComponent implements OnInit{

  form:FormGroup;
  steps:Array<Step>;
  items:Array<lisItem>;
  dialogData:modalInput;
  @ViewChild('dialog') alertDialog:AlertDialogComponent;
  @ViewChild('visualizer') visualizerDialog:ModalVisualizerComponent;
  @ViewChild('fileInput') fileInput: ElementRef;
  comodins:string[];
  imageUrl:string;
  fields:Array<Field>;
  documents:Array<document>

  constructor(private fb:FormBuilder,
  private stSv:StepService,private shareSv:ShareDataService,
  private htm2PdfSv:PdfConverterService,
  private fdSv:FieldService,private docSv:TemplateService,
  private nav:Router){
    this.initForm();
    this.items = new Array<lisItem>();
    this.form.get('name').valueChanges.subscribe(data=>{
      this.setNameTitle(data);
    })
    this.documents = new Array<document>();
  }
  async visualize(){
    let tmp = this.form.get('template').value;
    this.imageUrl = await this.htm2PdfSv.generatePdfImage(tmp);
    this.visualizerDialog.open();
  }
  setNameTitle(data){
    if(data != null){
      let id = this.form.get('orderId').value as number;
      this.items[id].name = data;
    }
  }
 
  setForm(event)
  {
    this.refreshDocs();
    let selected = this.documents.find(t=> t.orderId == event.id);
    this.initForm();
    //this.form.get('orderId').setValue(selected.orderId);
    this.form.patchValue({
      steps:selected.steps.map(t=> {return t.stepFk}),
      orderId:selected.orderId,
      name:selected.name,
      template:selected.template,
    });
    let fd = selected.fields.map(t=> { this.addFields(t.comodin,t.fieldFk)});
  
    //this.getFieldsControl.removeAt(this.getFieldsControl.length - 1);
    //this.form.get('fields').setValue(fd);
   // let st = selected.steps.map(t=> {return t.stepFk});


  }
  initForm(){
    this.form = this.fb.group
    ({
      name:['',Validators.required],
      steps:[[],Validators.required],
      template:['',Validators.required],
      orderId:[0,null],
      fields:this.fb.array([]),
    })
    this.form.get('name').valueChanges.subscribe(data=>{
      this.setNameTitle(data);
    })
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
  get getFieldsControl(){
    return this.form.get('fields') as FormArray;
  }
  addFields(comodin:string,fieldFk = 0){
    let con = this.fb.group({
      comodin:[comodin,Validators.required],
      fieldFk:[fieldFk,Validators.required]
    });

    this.getFieldsControl.push(con);
  }
  refreshDocs(){
    let value = this.form.value;
    let fields = value.fields as Array<documentFields>;
    let stp = value.steps as Array<number>;
    let doc = new document(value.template,value.name,fields,stp,value.orderId);
    let index = this.documents.findIndex(t=> t.orderId == value.orderId);
    if(index > -1){
      this.documents[index] = doc;
    }
    else{
      this.documents.push(doc);
    }
  }
  addCond()
  {
    this.refreshDocs();
    let lasId = this.documents.length;
    this.form.reset();
    this.form.get('orderId').setValue(lasId);
    this.getFieldsControl.clear();
    this.items.map(t=> t.selected = false);
    this.items.push(new lisItem('',lasId,true))
    this.shareSv.updateSharedData(this.items);
  }

  async handleFileUpload(event: any) 
  {

    const inputElement = event.target as HTMLInputElement;
    const file: File | null = (inputElement.files as FileList)[0];
    let self = this;
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = async (e) => {
        const fileContent = fileReader.result as string;
        let res = await this.htm2PdfSv.generatePdfImage(fileContent)
        this.imageUrl = res;
        self.form.get('template').setValue(fileContent);

        self.comodins =  Utilities.extractComodins(fileContent);
        self.comodins.map(t=>{
          this.addFields(t);
        })

      };
      fileReader.readAsText(file);
      event.target.value = null;
    } else {
      console.log('No file selected');
    }

    console.log("elemnt");
    console.log(event);
    const selectedFiles = this.fileInput.nativeElement.files;
    
    // Handle the selected file(s) here (e.g., upload to server, display information, etc.)
    if (selectedFiles.length > 0) {
      // Example: Log the name of the first selected file
      console.log('Selected:', selectedFiles[0].name);
    }
  }
  change(event){
    this.form.get('template').value;
  }
  ngOnInit(): void {
    this.getFields();
    this.getSteps();
    this.items.push(new lisItem('',0,true))
    this.sendData();
    this.comodins = new Array<string>();
  }
  sendData(){
    this.shareSv.updateSharedData(this.items);
  }
  getSteps()
  {
    this.stSv.getData(null).subscribe({
      next:(data)=>{
        if(data.success){
          this.steps = data.items as Array<Step>;
        }
        else{
          this.dialogData = new modalInput('',modalInput.getDataTitleError,'Ha ocurrido un error al conseguir las etapas ' + data.message,true )
        }
      },
      error:(err)=>{
        this.dialogData = new modalInput('',modalInput.getDataTitleError,'Ha ocurrido un error al conseguir las etapas ' + JSON.stringify(err),true )

      }
    })
  }
  changeComodin(comodin:AbstractControl<any,any>,event)
  {
    let value = comodin.value;
    console.log(value);
    let tmpl = this.form.get('template').value;
    let original:string = value.comodin;
    let newValue:string = value.fieldFk as string;
    let obj =  {
      [original]: '[fld_' + newValue+']'
    }
   
    tmpl = Utilities.replaceWords(tmpl,obj);
    console.log(tmpl);
    this.form.get('template').setValue(tmpl);
  }
  saveData()
  {
    console.log(this.documents);
    this.refreshDocs();
    this.docSv.saveData(this.documents).subscribe({
      next:(data)=>{
        if(data.success){
          this.dialogData = new modalInput("alertId","DATOS GUARDADOS!","Los campos se han guardado");
          this.alertDialog.open();
        }
      },
      error:(err)=>{
       // this.dialogData = new modalInput("alertId","DATOS GUARDADOS!","Los campos se han guardado");
       // this.alertDialog.open();
      }
    })
  }
  closeData(){
    this.nav.navigate(['../Templates'])
  }
  clearForm()
  {
    let ordd = this.form.get('orderId').value;
    let name = this.items.find(t=> t.id == ordd);
    name.name = '';
    this.shareSv.updateSharedData(this.items);
    this.form.reset();
    this.getFieldsControl.clear();
    //this.form.get('fields').reset()
    let or = this.documents.length;
    this.form.get('orderId').setValue(or);
  }


}
