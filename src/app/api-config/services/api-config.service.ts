import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { dataServiceInterface } from 'src/app/Commons/dataServiceInterface';
import { GenericResponse } from 'src/app/Commons/classes/GenericResponse';
import { Constants } from 'src/app/Commons/classes/Constants';
import { Utilities } from 'src/app/Commons/classes/Utilities';
import { ApiConfigFilters } from '../classes/ApiConfigFilters';

@Injectable({
  providedIn: 'root'
})
export class ApiConfigServices implements dataServiceInterface<ApiConfigServices>
{

  constructor(private http:HttpClient) { }

  getData(model?: ApiConfigFilters): Observable<GenericResponse<ApiConfigServices>> {
    var endpoint = Constants.GetApiConfigEP;
    var headers = Utilities.setDefaultHeaders();
    var params = Utilities.setDefaultParams(model);

    return this.http.get<GenericResponse<ApiConfigServices>>(endpoint,
      {params:params,headers:headers})
  }
  saveData(model?: Array<ApiConfigServices>): Observable<GenericResponse<ApiConfigServices>> {
    var endpoint = Constants.CreateApiConfigEP;
    var headers = Utilities.setDefaultHeaders();
    var body = JSON.stringify(model);

    return this.http.post<GenericResponse<ApiConfigServices>>(endpoint,body,
      {headers:headers})
  }
  editData(params?: any): Observable<GenericResponse<ApiConfigServices>> {
    throw new Error('Method not implemented.');
  }
  removeData(params?: any): Observable<GenericResponse<ApiConfigServices>> {
    throw new Error('Method not implemented.');
  }


}
