import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ApiConfigServices } from '../../services/api-config.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from 'ngx-editor';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import { Field } from 'src/app/field/classes/Field';
import { FieldService } from 'src/app/field/services/field.service';
import { Utilities } from 'src/app/Commons/classes/Utilities';
import { jsonProps } from '../../classes/jsonProps';
import { PropertyInfo } from '../PropertyInfo';
import { ShareDataService } from 'src/app/Commons/share-data.service';
import { ShareDataComplexService } from '../services/share-data-complex.service';
import { ApiConfigComponent } from '../../read/api-config.component';
import { apiConfiguration } from '../../classes/apiConfiguration';
import { apiParams } from '../../classes/apiParams';
import { Subscription } from 'rxjs';
import { headerParams } from '../../classes/headerParams';




@Component({
  selector: 'app-create-api-config',
  templateUrl: './create-api-config.component.html',
  styleUrls: ['./create-api-config.component.css']
})
export class CreateApiConfigComponent implements OnInit,OnDestroy{

  form:FormGroup;
  itemSelected:number;
 
  apiConfig:apiConfiguration;
  fields:Array<Field>;
  selectedItem: any;
  @ViewChild('jsonEditor') jsonEditorContainer: JsonEditorComponent;
  lastId:number;
  apiParamSubscription:Subscription;
  headerParamSubscription:Subscription;

  constructor(private apiConfSv:ApiConfigServices,
    private fb:FormBuilder,private fdSv:FieldService,
    private shData:ShareDataComplexService)
  {
    this.apiConfig = new apiConfiguration();
    this.form = fb.group({
      name:['',Validators.required],
      url:['',Validators.required],
      description:['',null],
      jsonBody:['',null],
      jsonResponse:['',null],
      httpMethod:[0,Validators.required],
      authType:[0,Validators.required],
      fromQuery:[false,Validators.required],
      paramsValue:fb.array([]),
      headers:fb.array([]),
      apiConditionals:fb.array([])
    })
  }
  ngOnDestroy(): void {
    this.apiParamSubscription.unsubscribe();
    this.headerParamSubscription.unsubscribe();
  }
  ngOnInit(): void {
    this.getFields();
    this.apiParamSubscription = this.shData.getDataObservable("apiParams").subscribe(data=>{
        this.apiConfig.paramsValue = data as Array<apiParams>;
    });
    this.headerParamSubscription = this.shData.getDataObservable("headerParams").subscribe(data=>{
      this.apiConfig.paramsValue = data as Array<headerParams>;
    })
  }

  setItem(val){
    this.itemSelected = val;
  }

  getFields(){
    this.fdSv.getData(null).subscribe({
      next:(data)=>{
        console.log(data);
        if(data.success){
          this.fields = data.items as Array<Field>;
        }
      },
      error:(err)=>{

      }
    })
  }


}
