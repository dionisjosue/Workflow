import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Field } from 'src/app/field/classes/Field';
import { headerParams } from '../../classes/headerParams';
import { ShareDataComplexService } from '../services/share-data-complex.service';
import { Validators } from 'ngx-editor';

@Component({
  selector: 'app-api-header',
  templateUrl: './api-header.component.html',
  styleUrls: ['./api-header.component.css']
})
export class ApiHeaderComponent {

  @Input()form:FormGroup;
  @Input()fields:Field[];
  apiHeaderFiled:boolean;//to indicate to parent if headers was filled
  
  headerParams:headerParams[];

  constructor(private shData:ShareDataComplexService,
    private formBuilder:FormBuilder){

  }


  get headersValue(){
    return this.form.get("headers") as FormArray;
  }
  sendData(){
    this.headerParams = this.headersValue.value as headerParams[];
    if(this.isValidApiParams(this.headerParams))
      {
        //send data to parent component
        this.shData.updateData("headerParams",this.headerParams);
      }
  }
  addItem(idx:number)
  {

    this.sendData();
    if((this.headersValue.controls.length -1) > idx)
    {
      return;
    }

    let item = this.formBuilder.group({
      name:['',Validators.required],
      fieldFk:['',null],
      value:['',null]
    })

    this.headersValue.push(item);
  }
  setValue(event,index:number){
    console.log(event);
    
  }
  removeItem(idx:number){
    this.headersValue.removeAt(idx);
  }

  private isValidApiParams(apiParams: headerParams[]): boolean {
    // Implement validation logic as needed
    return apiParams != null && apiParams.length >= 1 && apiParams[0].name.length >= 1;
  }
}
