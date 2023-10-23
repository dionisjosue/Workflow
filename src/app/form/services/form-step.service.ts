import { Injectable } from '@angular/core';
import { dataServiceInterface } from 'src/app/Commons/dataServiceInterface';
import { Form } from '../Classes/Form';
import { Observable } from 'rxjs';
import { FormFilter } from '../Classes/FormFilter';
import { HttpClient } from '@angular/common/http';
import { FormStep } from '../Classes/FormStep';
import { GenericResponse } from 'src/app/Commons/classes/GenericResponse';
import { Constants } from 'src/app/Commons/classes/Constants';
import { Utilities } from 'src/app/Commons/classes/Utilities';

@Injectable({
  providedIn: 'root'
})
export class FormStepService implements dataServiceInterface<FormStep>{

  constructor(private http:HttpClient) { }


  getData(filter?: FormFilter): Observable<GenericResponse<FormStep>> {
     var endpoint = Constants.GetFormStepEP;
    var headers = Utilities.setDefaultHeaders();

    var params = JSON.stringify(filter)

    return this.http.post<GenericResponse<FormStep>>(endpoint,params,{headers});
  }
  saveData(model?: Array<FormStep>): Observable<GenericResponse<FormStep>> {
    var endpoint = Constants.CreateFormStepEP;
    var headers = Utilities.setDefaultHeaders();

    var params = JSON.stringify(model)

    return this.http.post<GenericResponse<FormStep>>(endpoint,params,{headers});
  }
  editData(model?: Array<FormStep>): Observable<GenericResponse<FormStep>> {
    var endpoint = Constants.EditFormStepEP;
    var headers = Utilities.setDefaultHeaders();

    var params = JSON.stringify(model)

    return this.http.post<GenericResponse<FormStep>>(endpoint,params,{headers});
  }
  removeData(params?: Array<FormStep>): Observable<GenericResponse<FormStep>> {
    throw new Error('Method not implemented.');
  }
}
