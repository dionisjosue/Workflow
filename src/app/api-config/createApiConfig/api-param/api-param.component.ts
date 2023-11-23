import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from 'ngx-editor';
import { Field } from 'src/app/field/classes/Field';
import { apiParams } from '../../classes/apiParams';
import { ShareDataService } from 'src/app/Commons/share-data.service';
import { ShareDataComplexService } from '../services/share-data-complex.service';

@Component({
  selector: 'app-api-param',
  templateUrl: './api-param.component.html',
  styleUrls: ['./api-param.component.css']
})
export class ApiParamComponent{

  @Input() form:FormGroup;
  @Input() fields:Field[];
  paramsValue:apiParams[];

  constructor(private formBuilder:FormBuilder,private shData:ShareDataComplexService){

  }
 

  get ParamsValue(){
    return this.form.get("paramsValue") as FormArray;
  }
  sendData(){
    this.paramsValue = this.ParamsValue.value as apiParams[];
    if(this.isValidApiParams(this.paramsValue))
      {
        //send data to parent component
        this.shData.updateData("apiParams",this.paramsValue);
      }
  }
  addItem(idx:number)
  {

    this.sendData();
    if((this.ParamsValue.controls.length -1) > idx)
    {
      return;
    }

    let item = this.formBuilder.group({
      name:['',Validators.required],
      fieldFk:['',null],
      value:['',null]
      //description:['',Validators.required]
    })

    this.ParamsValue.push(item);


  }
  setValue(event,index:number){
    console.log(event);
    
  }
  removeItem(idx:number){
    this.ParamsValue.removeAt(idx);
  }

  private isValidApiParams(apiParams: apiParams[]): boolean {
    // Implement validation logic as needed
    return apiParams != null && apiParams.length >= 1 && apiParams[0].name.length >= 1;
  }
}
