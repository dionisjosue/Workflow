import { Injectable } from '@angular/core';
import { Form } from '../classes/Form';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GenericResponse } from '@share/classes/GenericResponse';
import { dataServiceInterface } from '@share/services/dataServiceInterface';
import { Constants } from '@share/classes/Constants';
import { Utilities } from '@share/Utilities';
import { FormFilter } from '@form/classes/FormFilter';

@Injectable({
  providedIn: 'root'
})
export class FormService implements dataServiceInterface<Form>{

  constructor(private http:HttpClient) { }


  getData(filter?: FormFilter): Observable<GenericResponse<Form>> {
     var endpoint = Constants.GetFormEP;
    var headers = Utilities.setDefaultHeaders();

    var params = JSON.stringify(filter)

    return this.http.post<GenericResponse<Form>>(endpoint,params,{headers});
  }
  saveData(model?: Form): Observable<GenericResponse<Form>> {
    var endpoint = Constants.CreateFormEP;
    var headers = Utilities.setDefaultHeaders();

    var params = JSON.stringify(model)

    return this.http.post<GenericResponse<Form>>(endpoint,params,{headers});
  }
  editData(model?: Array<Form>): Observable<GenericResponse<Form>> {
    var endpoint = Constants.EditFormEP;
    var headers = Utilities.setDefaultHeaders();

    var params = JSON.stringify(model)

    return this.http.post<GenericResponse<Form>>(endpoint,params,{headers});
  }
  removeData(params?: Array<Form>): Observable<GenericResponse<Form>> {
    throw new Error('Method not implemented.');
  }
}
