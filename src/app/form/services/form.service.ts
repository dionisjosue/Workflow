import { Injectable } from '@angular/core';
import { dataServiceInterface } from 'src/app/Commons/dataServiceInterface';
import { Form } from '../Classes/Form';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GenericResponse } from 'src/app/Commons/classes/GenericResponse';
import { Constants } from 'src/app/Commons/classes/Constants';
import { Utilities } from 'src/app/Commons/classes/Utilities';
import { FormFilter } from '../Classes/FormFilter';

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
