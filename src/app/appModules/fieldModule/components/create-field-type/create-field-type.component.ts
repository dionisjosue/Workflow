import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Alert } from '@share/classes/Alert';

@Component({
  selector: 'app-create-field-type',
  templateUrl: './create-field-type.component.html',
  styleUrls: ['./create-field-type.component.css']
})
export class CreateFieldTypeComponent {

  alert:Alert;
  form:FormGroup;
  @ViewChild('createFieldType')modal: ElementRef;

  constructor(private fb:FormBuilder,
    private md:NgbModal){
    this.form = fb.group({
      rows:fb.array([])
    })
  }

  get rows(){
    return this.form.get("rows") as FormArray
  }
  saveFiedlType(){

  }
  closeAlert(item){

    this.md.dismissAll();
  }
  createRow(){

    let row = this.fb.group({
      name: ['',Validators.required],
      dataType:['',Validators.required],
    });

    this.rows.push(row);
  }
  removeRow(idx){
    this.rows.removeAt(idx);
  }
  openModal(){
    this.md.open(this.modal,{
      size:'md',
      backdrop:'static',
      animation:true
    });
  }
}
