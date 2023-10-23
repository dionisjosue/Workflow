import { AfterViewInit, Component, OnInit, ViewChild, numberAttribute } from '@angular/core';
import { modalInput } from 'src/app/alert-dialog/modalInput';
import { Field } from 'src/app/field/classes/Field';
import { FormField } from '../Classes/FormField';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SectionService } from '../services/section.service';
import { FieldService } from 'src/app/field/services/field.service';
import { StepService } from 'src/app/step/Services/step.service';
import { Step } from 'src/app/step/Classes/Step';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Data, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { Form } from '../Classes/Form';
import { FormStep } from '../Classes/FormStep';
import { FormService } from '../services/form.service';
import { AlertDialogComponent } from 'src/app/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css']
})
export class CreateFormComponent implements OnInit,AfterViewInit{

  dialogInput:modalInput;
  fields:Array<Field>;
  form:FormGroup;
  formFields:Array<{name:string,id:number,data:  Array<FormField>}>
  idx:number = 0; //IDENTIFICADOR DE LOS ARRAY DE SECCIONES
  steps:Array<Step>
  fieldId:number=0;
  opt:DataTables.Settings = {};
  trigger:Subject<any> = new Subject<any>();
  @ViewChild('dialog')dialog:AlertDialogComponent;
  @ViewChild(DataTableDirective, {static: false})  dtElement: DataTableDirective;

  constructor(private fb:FormBuilder,public secSv:SectionService,
    private fieldSv:FieldService,private stepSv:StepService,
    private FormSv:FormService,private nav:Router){

    this.form = fb.group({
      title: ['',Validators.required],
      description: ['',Validators.required],
      formFields: this.fb.array([]),
      formSteps:[Array<number>,null],
      sectionFk:[0,Validators.required],
      fieldFk: [[],Validators.required],
      sectionName:['',Validators.required],
      idx:[0,null]

    })
    this.formFields = new Array<{name:string,id:0,data:  Array<FormField>}>();
  }

  ngAfterViewInit(): void {
    this.trigger.next(null);
  }

  ngOnInit(): void 
  {
    this.opt = {
      pagingType:"full_numbers",
      ordering:false,
      order: [[0, 'asc']]
    }
    this.getFields();
    this.getSteps();
  }
  ngOnDestroy(): void {
    this.trigger.unsubscribe();
  }

  get rowFields(){
    return this.form.get("formFields") as FormArray
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.trigger.next(this.rowFields);
    });
  }

  getFields(){
    this.fieldSv.getData(null).subscribe({
      next:(data)=>{
        if(data.success){
          this.fields = data.items as Array<Field>
        }
      },
      error:(err)=>{

      }
    })
  }

  getSteps(){
    this.stepSv.getData(null).subscribe({
      next:(data)=>{
        if(data.success){
          this.steps = data.items as Array<Step>;
        }
      },
      error:(err)=>{

      }
    })
  }

  addFieldRow(idx?:number,fd?:Field)
  {
    let row = this.fb.group({
      formFk:[0,Validators.required],
      isRequired:[false,null],
      isReadonly:[false,null],
      idx:[idx,null],
      fieldFk:[fd.id,null],
      columnTemplate:[0,null],
      name:[fd.name,null],
      type:[fd.fieldType?.name,null],
      defaultValue:[fd.defaultValue,null],
      maxValue:[fd.maxValue,null],
      minValue:[fd.minValue,null],

    });

    this.rowFields.push(row);
  }

  addFieldRowForm(fd:any)
  {
    let row = this.fb.group({
      formFk:[0,Validators.required],
      isRequired:[fd.isRequired,null],
      isReadonly:[fd.isReadonly,null],
      idx:[fd.idx,null],
      fieldFk:[fd.fieldFk,null],
      columnTemplate:[fd.columnTemplate,null],
      name:[fd.name,null],
      type:[fd.type,null],
      defaultValue:[fd.defaultValue,null],
      maxValue:[fd.maxValue,null],
      minValue:[fd.minValue,null],

    });

    this.rowFields.push(row);
  }

  addField(event){

    console.log(event);
    let idx = this.rowFields?.length ?? 0;
    idx++;
    this.addFieldRow(idx,event);
    this.rerender();

  }

  removeField(event){
    console.log(event);
    this.rowFields.removeAt(event.index);
    this.rerender();

  }

  removeAll(event){
     this.rowFields.clear();
     this.rerender();
  }

  onCloseAlert(event){
    this.nav.navigate(['../Forms']);

  }

  addSection(event,idx){
    console.log(event);
  }
  dataSaved(event,ix){
    this.form.get("sectionName").patchValue(event.name);
  }

  saveFieldsOfSection()
  {
    let data = this.rowFields.value as Array<any>;
    if(data.length > 0)
    {
      let sectionId = this.form.get('sectionFk').value;
      let sectionName = this.form.get('sectionName').value;

      data.map((t,index)=> {
        t.sectionFk = sectionId,
        t.order = index +1
      });

      let id = this.form.get('idx').value;
      let exist = this.formFields.findIndex(t=> t.id == id);

      this.rowFields.clear();
      this.form.get('sectionFk').patchValue(0);
      this.form.get('fieldFk').patchValue([]);

      //this.form.reset();
      if(exist >= 0){
        this.formFields[exist].data = data;
        this.formFields[exist].name = sectionName;

      }
      else{
        this.idx++;
        this.formFields.push({
          id:this.idx,
          data,
          name:sectionName
        })
        this.idx++
        this.form.get('idx').patchValue(this.idx);
        console.log(this.formFields);
      }
      this.rerender();

    } 
  
  }

  saveForms(){
    let form = this.form.value as Form;
    let any = this.form.get('formSteps').value as Array<number>;
    if(form){
      form.formFields = new Array<FormField>();
      this.formFields.map((t,idx)=> {
        t.data.map(r=> {
          r.sectionOrder = idx+1;
          form.formFields.push(r)
        })
      })
      form.formSteps = new Array<FormStep>();
      any.map(t=> {
        form.formSteps.push(new FormStep(t))
      })

    }

    this.FormSv.saveData(form).subscribe({
      next:(data)=>{
        if(data.success){
          this.dialogInput = new modalInput("alertId","DATOS GUARDADOS!","Los campos se han guardado");
           this.dialog.open();
        }
      },
      error:(err)=>{

      }
    })
  }

  onDrop(event: CdkDragDrop<any>) {
    const previousIndex = event.previousIndex;
    const newIndex = event.currentIndex;

    // Rearrange the items in the FormArray
    const movedItem = this.rowFields.at(previousIndex);
    this.rowFields.removeAt(previousIndex);
    this.rowFields.insert(newIndex, movedItem);
  }
  setForm(item:any){
    let fieldsId = item.data.map(t=> t.fieldFk) as Array<number>
    this.form.get('sectionFk').patchValue(item.data[0].sectionFk);
    this.form.get('idx').patchValue(item.id);
    this.form.get('fieldFk').patchValue(fieldsId);
    this.rowFields.patchValue(item.data);
   ///this.form.get('formFields').patchValue(item.data);
    this.form.get('sectionName').patchValue(item.name);
    item.data.map((t,idx)=> {
      console.log(t);
      this.addFieldRowForm(t)
    });
  }
  itemSelected(event){
    this.rowFields.clear();
    this.form.get('sectionFk').patchValue(0);
    this.form.get('fieldFk').patchValue([]);

    this.setForm(event);
    this.rerender();
  }
}
