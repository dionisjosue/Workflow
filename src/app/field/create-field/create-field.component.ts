import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FieldType } from '../classes/FieldType';
import { FieldService } from '../services/field.service';
import { FieldTypeService } from 'src/app/field-type/services/field-type.service';
import { Field } from '../classes/Field';
import { modalInput } from 'src/app/alert-dialog/modalInput';
import { AlertDialogComponent } from 'src/app/alert-dialog/alert-dialog.component';
import { FieldOptions } from '../classes/FieldOptions';
import { FieldOptionService } from '../services/field-option.service';
import { ItemsList } from '@ng-select/ng-select/lib/items-list';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-field',
  templateUrl: './create-field.component.html',
  styleUrls: ['./create-field.component.css']
})
export class CreateFieldComponent implements OnInit,AfterViewInit{


  formField:FormGroup;
  fieldTypes:Array<FieldType>
  dialogInput:modalInput;
  fieldOptions:Array<FieldOptions>
  fieldOptionsModel:Array<FieldOptions>
  idx:number = 0;
  idx_fopt:number=0;
  @ViewChild('dialog')dialog:AlertDialogComponent;


  constructor(private fieldSv:FieldService,
    private fb:FormBuilder,
    public fieldTypeSv:FieldTypeService,
    private fieldOptSv:FieldOptionService,private nav:Router){
    this.formField = fb.group({
      fieldTypes: this.fb.array([]),
    })
    this.dialogInput = new modalInput('','','');
    this.createRow();

  }
  ngAfterViewInit(): void {

  }

  ngOnInit(): void 
  {
    this.getFieldTypes(null);
  }



  get rows():FormArray{
    return this.formField.get("fieldTypes") as FormArray;
  }
  getFieldOpt(idx):FormArray{
     return this.rows.at(idx).get("fieldOptions") as FormArray
  }

  createRow(){
    this.idx++;
    let self=  this;
    let row = this.fb.group({
      name: ['',Validators.required,Validators.pattern("/^\d+(\.\d{1,2})?$/")],
      fieldTypeFk:[0,Validators.required],
      defaultValue:['',null],
      maxValue:[null,null],
      minValue:[null,null],
      maxLength:[null,null],
      requireOptions:[false,null],
      optionsAllowed:[0,null],
      fieldOptionsStr: [[],null], //this.fb.array([]),
      idx:[self.idx,null]

    });

    this.rows.push(row);
  }
  addOption(row,idx?:number)
  {
    this.idx_fopt++;
    row = row ?? this.rows.at(idx);
  }
  removeOption(row,idxOpt:number,idx?:number){
    row = row ?? this.rows.at(idx);
    console.log(row);
    //(row.get("fieldOptions") as FormArray).removeAt(idx)
  }
  onAddOption(idx:number,event){
    console.log(event);

    let vlor = this.rows.at(idx).get('fieldOptionsStr') as FormControl
    var val = vlor.value as string[];;

    let exists = vlor.value.filter(t=> t.toLowerCase() == event.name.toLowerCase())
    if(exists.length > 1)
    {
      val.pop();
      vlor.setValue(val);
    }
  }
  onRemoveOption(idx,event){
    let row = this.rows.at(idx);
  }
  onSelectType(idx:number){
    var row = this.rows.at(idx);
    var fieldType = row.get('fieldTypeFk').value as number;
    var type = this.fieldTypes.find(t=> t.id == fieldType);
    row.get("requireOptions").setValue(type.requireOptions);
    row.get("optionsAllowed").setValue(type.optionsAllowed);

  }

  getFieldTypes(params){
      this.fieldTypeSv.getData(params).subscribe({
        next:(data)=>{
            if(data.success){
              this.fieldTypes = data.items as Array<FieldType>;
            }
        },
        error:(err)=>{

        }
      })
  }
  getFieldOptions(){
    this.fieldOptSv.getData(null).subscribe({
      next:(data)=>{
        if(data.success){
          this.fieldOptions = data.items as Array<FieldOptions>;
        }
        this.fieldOptions = this.fieldOptions ?? new Array<FieldOptions>();

      },
      error:(data)=>{
        console.log(data);
        this.fieldOptions = this.fieldOptions ?? new Array<FieldOptions>();

      }
    })
  }

  removeRow(index){
    this.rows.removeAt(index);
  }
  getFieldOptionsField(field:Field):FieldOptions[]{
    let opt = field.fieldOptionsStr.map((item)=>({
        displayValue:item,
        idx_field_fk:field.idx,
        field_fk:0,
        realValue:'',
        id:0,
        createdBy :'',
        createdDate :new Date(),
        active:true,
        lastModifiedDate :new Date()
    }));
    return opt as Array<FieldOptions>;
  }
  saveFields(){
    let field = this.formField.get('fieldTypes').value as Array<Field>;
     let self = this;
    field.forEach(t=>{
      t.fieldOptions =  self.getFieldOptionsField(t)
      t.id = 0;
    });
    console.log(field)

    this.fieldSv.saveData(field).subscribe({
      next:(data)=>{
        if(data.success)
        {
           this.dialogInput.modalId = "alertId";
           this.dialogInput.message = "Los campos se han guardado";
           this.dialogInput.title = "DATOS GUARDADOS!"
           this.dialog.open();
        }
      },
      error:(err)=>{
      }
    });
  }
  onCloseAlert(event){
    this.nav.navigate(['../Campo']);

  }

  onFieldOptionsGroupChange(event){
    console.log(event);
  }

}
