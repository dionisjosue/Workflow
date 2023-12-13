import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Field } from '@field/classes/Field';
import { headerParams } from './headerParams';
import { ShareDataComplexService } from '@share/services/share-data-complex.service';
import { FieldService } from '@field/services/field.service';

@Component({
  selector: 'app-api-header',
  templateUrl: './api-header.component.html',
  styleUrls: ['./api-header.component.css']
})
export class ApiHeaderComponent implements OnInit,OnDestroy {

  formHeader:FormGroup;
  fields:Field[];
  apiHeaderFiled:boolean;//to indicate to parent if headers was filled
  
  headerParams:headerParams[];

  constructor(private shData:ShareDataComplexService,
    private formBuilder:FormBuilder,
    private fdSv:FieldService){
      this.formHeader = formBuilder.group({
        headers:formBuilder.array([])
      })
  }
  ngOnInit(): void {
    this.getFields();
    this.addItem(0);
    this.formHeader.valueChanges.subscribe((data) => {
      console.log("probando");
      this.sendData();
    });
  }
  ngOnDestroy(): void {
    //this.sendData();
  }

  get headersValue(){
    return this.formHeader.get("headers") as FormArray;
  }
  getValueByIdxAndName(idx:number,nameControl:string){
    return this.headersValue.at(idx).get(nameControl) as FormControl;
  }
  validItmApiParam(val:headerParams){
    return val.name != null && val.name.length > 0 &&
        (val.fieldFk != null && val.fieldFk > 0 || 
        val.value != null && val.value.length > 0)
  }
  setDataValidToSend(){
    this.headerParams = new Array<headerParams>();
    this.headersValue.controls.forEach((itemControl, index) => {
      let val = itemControl.value as headerParams
      if(this.validItmApiParam(val)){
        this.headerParams.push(val);
      }
    });
  }
  sendData(){
    this.setDataValidToSend();
    if(this.isValidApiParams(this.headerParams))
    {
      this.shData.updateData("headerParams",this.headerParams);
    }
  }
  addItem(idx:number)
  {
    if((this.headersValue.controls.length -1) > idx)
    {
      return;
    }
    let item = this.formBuilder.group({
      name:['',Validators.required],
      fieldFk:[0,null],
      value:['',null]
    })
    this.headersValue.push(item);
  }
  setValue(event,index:number)
  {
    if(!event.id){
      this.getValueByIdxAndName(index,'value').setValue(event.name);
      this.getValueByIdxAndName(index,'fieldFk').setValue('');
    }
    else{
      this.getValueByIdxAndName(index,'value').setValue('');
      this.getValueByIdxAndName(index,'fieldFk').setValue(event.id);
    }
  }
  removeItem(idx:number){
    this.headersValue.removeAt(idx);
  }

  private isValidApiParams(apiParams: headerParams[]): boolean {
    // Implement validation logic as needed
    return apiParams != null && apiParams.length >= 1 && apiParams[0].name.length >= 1;
  }

  getFields(){
    this.fdSv.getData(null).subscribe({
      next:(data)=>{
        if(data.result.success){
          this.fields = data.items;
        }
      }
    })
  }
}
