import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConfigFilters } from '@api/classes/ApiConfigFilters';
import { apiConfiguration } from '@api/components/createApiConfig/create-api-config/apiConfiguration';
import { Utilities } from '@share/Utilities';
import { Constants } from '@share/classes/Constants';
import { GenericResponse } from '@share/classes/GenericResponse';
import { dataServiceInterface } from '@share/services/dataServiceInterface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiConfigServices implements dataServiceInterface<apiConfiguration>
{

  constructor(private http:HttpClient) { }

  getData(model?: ApiConfigFilters): Observable<GenericResponse<apiConfiguration>> {
    var endpoint = Constants.GetApiConfigEP;
    var headers = Utilities.setDefaultHeaders();
    var params = Utilities.setDefaultParams(model);

    return this.http.get<GenericResponse<apiConfiguration>>(endpoint,
      {params:params,headers:headers})
  }
  saveData(model?: Array<apiConfiguration>): Observable<GenericResponse<apiConfiguration>> {
    var endpoint = Constants.CreateApiConfigEP;
    var headers = Utilities.setDefaultHeaders();
    var body = JSON.stringify(model);
    console.log(body);

    return this.http.post<GenericResponse<apiConfiguration>>(endpoint,body,
      {headers:headers})
  }
  editData(params?: any): Observable<GenericResponse<apiConfiguration>> {
    throw new Error('Method not implemented.');
  }
  removeData(params?: any): Observable<GenericResponse<apiConfiguration>> {
    throw new Error('Method not implemented.');
  }


}
