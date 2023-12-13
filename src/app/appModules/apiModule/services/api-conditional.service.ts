import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { dataServiceInterface } from '@share/services/dataServiceInterface';
import { apiConditionals } from '@api/components/conditional-api/apiConditionals';
import { GenericResponse } from '@share/classes/GenericResponse';
import { apiConditionalFilters } from '@api/classes/apiConditionalFilters';
import { Constants } from '@share/classes/Constants';
import { Utilities } from '@share/Utilities';

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
