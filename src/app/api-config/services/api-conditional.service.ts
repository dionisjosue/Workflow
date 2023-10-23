import { Injectable } from '@angular/core';
import { dataServiceInterface } from 'src/app/Commons/dataServiceInterface';
import { ApiConfigServices } from './api-config.service';
import { Observable } from 'rxjs';
import { GenericResponse } from 'src/app/Commons/classes/GenericResponse';
import { apiConditionals } from '../classes/apiConditionals';
import { apiConditionalFilters } from '../classes/apiConditionalFilters';
import { Constants } from 'src/app/Commons/classes/Constants';
import { Utilities } from 'src/app/Commons/classes/Utilities';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiConditionalService implements dataServiceInterface<apiConditionals>{

  constructor(private http:HttpClient) { }

  getData(model?: apiConditionalFilters): Observable<GenericResponse<apiConditionals>> {
    var endpoint = Constants.GetApiConditionalEP;
    var headers = Utilities.setDefaultHeaders();
    var params = Utilities.setDefaultParams(model);

    return this.http.get<GenericResponse<apiConditionals>>(endpoint,
      {params:params,headers:headers})
  }
  saveData(model?: Array<apiConditionals>): Observable<GenericResponse<apiConditionals>> {
    var endpoint = Constants.CreateApiConditionalEP;
    var headers = Utilities.setDefaultHeaders();
    var body = JSON.stringify(model);

    return this.http.post<GenericResponse<apiConditionals>>(endpoint,body,
      {headers:headers})
  }
  editData(model?: Array<apiConditionals>): Observable<GenericResponse<apiConditionals>> {
    var endpoint = Constants.EditApiConditionalEP;
    var headers = Utilities.setDefaultHeaders();
    var body = JSON.stringify(model);

    return this.http.post<GenericResponse<apiConditionals>>(endpoint,body,
      {headers:headers})
  }
  removeData(params?: Array<apiConditionals>): Observable<GenericResponse<apiConditionals>> {
    throw new Error('Method not implemented.');
  }

}
