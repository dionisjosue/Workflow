import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { apiConfiguration } from './apiConfiguration';
import { Field } from '@field/classes/Field';
import { ApiConfigServices } from '@api/services/api-config.service';
import { FieldService } from '@field/services/field.service';
import { ShareDataComplexService } from '@share/services/share-data-complex.service';
import { headerParams } from '../api-header/headerParams';
import { apiParams } from '../api-param/apiParams';
import { apiAuthorization } from '@api/classes/apiAuthorization';
import { PropertyInfoService } from '@api/services/property-info.service';
import { statusApiResult } from '@share/classes/statusApiResult';
import { AlertDialogComponent } from '@share/components/alert-dialog/alert-dialog.component';
import { modalInput } from '@share/classes/modalInput';




@Component({
  selector: 'app-create-api-config',
  templateUrl: './create-api-config.component.html',
  styleUrls: ['./create-api-config.component.css']
})
export class CreateApiConfigComponent implements OnInit,OnDestroy,AfterViewInit{

  form:FormGroup;
  itemSelected:number;
 
  apiConfig:apiConfiguration;
  fields:Array<Field>;
  selectedItem: any;
  lastId:number;
  saveResult:statusApiResult;
  dataValid:boolean = true;

  //subscriptions
  apiParamSubscription:Subscription;
  headerParamSubscription:Subscription;
  apiAuthSubscription:Subscription;
  apiConfigSubscription:Subscription;

  @ViewChild('dialog')dialog:AlertDialogComponent;



  constructor(private apiConfSv:ApiConfigServices,
    fb:FormBuilder,private fdSv:FieldService,
    private shData:ShareDataComplexService,
    private propInfo:PropertyInfoService,
    private nav:Router,private route:ActivatedRoute)
  {
    this.apiConfig = new apiConfiguration();
    this.form = fb.group({
      name:['',[Validators.required,Validators.maxLength(100),Validators.minLength(5)]],
      url:['',[Validators.required,Validators.maxLength(200),Validators.minLength(5)]],
      description:[null,null],
      httpMethod:[0,Validators.required],
    })
  }
  ngAfterViewInit(): void {
    let self = this;    
    this.form.valueChanges.subscribe(()=>{
      self.dataValid = !self.form.invalid
    });
  }
  get getUrl():FormControl{
    return this.form.get('url') as FormControl;
  }
  get getName():FormControl{
    return this.form.get('name') as FormControl;
  }
  get gethttpMethod():FormControl{
    return this.form.get('httpMethod') as FormControl;
  }
  get getdescription():FormControl{
    return this.form.get('description') as FormControl;
  }

  ngOnDestroy(): void 
  {
    this.apiParamSubscription.unsubscribe();
    this.headerParamSubscription.unsubscribe();
    this.apiAuthSubscription.unsubscribe();
 
    
    this.shData.updateData('apiParams',null);
    this.shData.updateData('headerParams',null);
    this.shData.updateData('apiAuthorization',null);
    this.shData.updateData('apiParamsInit',null);
    //this.shData.updateData('apiConfig',null);

    this.propInfo.setRootPropertyInfo(null);

  }
  ngOnInit(): void 
  {
    let self = this;

    this.apiParamSubscription = this.shData.getDataObservable("apiParams").subscribe(data=>{
      self.apiConfig.paramsValue = data as Array<apiParams>;
    });
    this.headerParamSubscription = this.shData.getDataObservable("headerParams").subscribe(data=>{
      self.apiConfig.headers = data as Array<headerParams>;
    });
    this.apiAuthSubscription = this.shData.getDataObservable("apiAuthorization").subscribe(data=>{
      self.apiConfig.apiConfigAuthorization = data as apiAuthorization;
    });
   

  }
  initializeForm(data:apiConfiguration){
    this.getUrl.setValue(data.url);
    this.getName.setValue(data.name);
    this.getdescription.setValue(data.description);
    this.gethttpMethod.setValue(data.httpMethod);
  }

  saveData()
  {

    this.validateSave();
    if(this.dataValid){
      this.apiConfig.url = this.getUrl.value;
      this.apiConfig.description = this.getdescription.value;
      this.apiConfig.httpMethod = this.gethttpMethod.value;
      this.apiConfig.name = this.getName.value;
  
      this.buildApiFields();
      let data = new Array<apiConfiguration>();
      data.push(this.apiConfig);
      this.apiConfSv.saveData(data).subscribe({
        next:(data)=>{
          let res = data.result;
          if(res.success){
            res.title = modalInput.saveTitleSuccess;
            res.message = modalInput.saveMessageDetail;
          }
          else{
            res.title = modalInput.saveTitleError;
            res.message = res.message;
          }
          this.saveResult = res;
          this.dialog.open();
        }
      });
    }
    else
    {
      this.form.markAllAsTouched();
    }

  }
  buildApiFields(){
    let apiFds = this.propInfo.ParsePropertyInfoToApiFields(this.apiConfig?.id);
    this.apiConfig.apiFields = apiFds;
  }
  validateSave():void{
    console.log('validando');
    let root = this.propInfo.getRootPropertyInfo();
    let bodyVal:boolean = true;
    if(root){
      this.apiConfig.jsonBody = JSON.stringify(root.jsonText);
      bodyVal= this.propInfo.validatePropsAreAllMapped(root);
    }
    let apiConfigAuthVal:boolean = true;
    if(this.apiConfig.apiConfigAuthorization){
      apiConfigAuthVal = this.apiConfig.apiConfigAuthorization.isValid;
    }

    this.dataValid = bodyVal &&  !this.form.invalid && apiConfigAuthVal;
  }
  onCloseValidate(){
    if(this.saveResult.success){
      this.nav.navigate(['../api']);
    }
    this.saveResult = null;
  }


}
