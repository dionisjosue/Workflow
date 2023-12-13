import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { apiParams } from './apiParams';
import { ShareDataComplexService } from '@share/services/share-data-complex.service';
import { Field } from '@field/classes/Field';
import { FieldService } from '@field/services/field.service';

@Component({
  selector: 'app-api-param',
  templateUrl: './api-param.component.html',
  styleUrls: ['./api-param.component.css']
})
export class ApiParamComponent implements OnInit,OnDestroy{

  formApi:FormGroup;
  fields:Field[];
  dataEntityToSend:apiParams[];
  @Input()initData:apiParams[]

  constructor(private formBuilder:FormBuilder,private shData:ShareDataComplexService,
    private FieldSv:FieldService){
    this.formApi = formBuilder.group({
      paramsValue:formBuilder.array([]),
    })
  }

  get ParamsValue(){
    return this.formApi.get("paramsValue") as FormArray;
  }

  ngOnDestroy(): void {
    //this.sendData();
  }
  ngOnInit(): void 
  {
    this.getFields();
    this.addItem(0);
    this.formApi.valueChanges.subscribe((data) => {
      this.sendData();
    });
    if(this.initData){
      this.ParamsValue.setValue(this.initData);
    }
  }


  getValueByIdxAndName(idx:number,nameControl:string){
    return this.ParamsValue.at(idx).get(nameControl) as FormControl;
  }
  validItmApiParam(val:apiParams){
    return val.name != null && val.name.length > 0 &&
        (val.fieldFk != null && val.fieldFk > 0 || 
        val.value != null && val.value.length > 0)
  }
  setDataValidToSend(){
    this.dataEntityToSend = new Array<apiParams>();
    console.log(
      this.ParamsValue.value
    );
    this.ParamsValue.value.forEach((value, index) => {
      let val = value as apiParams
      if(this.validItmApiParam(val))
      {
        this.dataEntityToSend.push(val);
      }
    });


  }
  sendData()
  {
    this.setDataValidToSend();

    if(this.dataEntityToSend.length > 0)
      {
        console.log(this.dataEntityToSend);
        this.shData.updateData("apiParams",this.dataEntityToSend);
      }
  }
  addItem(idx:number)
  {
    if((this.ParamsValue.controls.length -1) > idx)
    {
      return;
    }

    let item = this.formBuilder.group({
      name:[null,Validators.required],
      fieldFk:[null,null],
      value:[null,null],
      apiConfigurationFk:[0,null]
    })

    this.ParamsValue.push(item);
    //this.sendData();

  }
  getFields(){
    this.FieldSv.getData(null).subscribe({
      next:(data)=>{
        if(data.result.success){
          this.fields = data.items;
        }
      }
    })
  }

  setValue(event,index:number)
  {
    console.log(event);
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
    this.ParamsValue.removeAt(idx);
    this.sendData();

  }

  private isValidApiParams(apiParams: apiParams): boolean {
    // Implement validation logic as needed
    var isValid =  !apiParams  && apiParams[0].name.length >= 1;

    return isValid;
  }
}
