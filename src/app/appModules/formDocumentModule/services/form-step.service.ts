import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { dataServiceInterface } from '@share/services/dataServiceInterface';
import { FormStep } from '@form/classes/FormStep';
import { GenericResponse } from '@share/classes/GenericResponse';
import { Constants } from '@share/classes/Constants';
import { Utilities } from '@share/Utilities';
import { FormFilter } from '@form/classes/FormFilter';

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
