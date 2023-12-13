import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthenticationConfig } from './AuthenticationConfig';
import { ShareDataComplexService } from '@share/services/share-data-complex.service';
import { dependentFieldValidator } from '@share/validators/dependentFieldValidator';
import { apiAuthorization } from '@api/classes/apiAuthorization';

@Component({
  selector: 'app-authentication-api',
  templateUrl: './authentication-api.component.html',
  styleUrls: ['./authentication-api.component.css']
})
export class AuthenticationApiComponent implements AfterViewInit,OnDestroy,OnInit{

  formAuth:FormGroup;
  authFiled:boolean;//to indicate to parent if auth was filled

  constructor(private shData:ShareDataComplexService,
    private fbBuilder:FormBuilder)
  {
    this.formAuth = fbBuilder.group({
      authType:[0,Validators.required],
      username:['',null],
      password:['',null],
      key:['',null],
      apiKeyValue:['',null],
      token:['',null]
    })
  }

  ngOnDestroy(): void {
    
  }
  ngOnInit(): void {
    this.formAuth.valueChanges.subscribe(()=>{
      this.sendData();
    });
  }
  sendData(){
    let data = this.formAuth.value as apiAuthorization
    data.isValid = !this.formAuth.invalid;
    this.shData.updateData('apiAuthorization',data);
  }
  ngAfterViewInit(): void {
    this.username.setValidators(dependentFieldValidator(this.authType,2))
    this.password.setValidators(dependentFieldValidator(this.authType,2))
    this.key.setValidators(dependentFieldValidator(this.authType,3))
    this.apiKeyValue.setValidators(dependentFieldValidator(this.authType,3))
    this.token.setValidators(dependentFieldValidator(this.authType,1))
  }

  get authType(){
    return this.formAuth.get('authType') as FormControl;
  }
  get username(){
    return this.formAuth.get('username') as FormControl;
  }
  get password(){
    return this.formAuth.get('password') as FormControl;
  }
  get key(){
    return this.formAuth.get('key') as FormControl;
  }
  get token(){
    return this.formAuth.get('token') as FormControl;
  }
  get apiKeyValue(){
    return this.formAuth.get('apiKeyValue') as FormControl;
  }


}
