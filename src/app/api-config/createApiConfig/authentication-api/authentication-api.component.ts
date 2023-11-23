import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationConfig } from './classes/AuthenticationConfig';
import { ShareDataComplexService } from '../services/share-data-complex.service';

@Component({
  selector: 'app-authentication-api',
  templateUrl: './authentication-api.component.html',
  styleUrls: ['./authentication-api.component.css']
})
export class AuthenticationApiComponent {

  //form:FormGroup;
  authConfig:AuthenticationConfig;
  authFiled:boolean;//to indicate to parent if auth was filled

  constructor(private shData:ShareDataComplexService,
    private fbBuilder:FormBuilder){

  
  }

}
