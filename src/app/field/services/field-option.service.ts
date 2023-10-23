import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { dataServiceInterface } from 'src/app/Commons/dataServiceInterface';
import { FieldOptions } from '../classes/FieldOptions';
import { GenericResponse } from 'src/app/Commons/classes/GenericResponse';
import { Constants } from 'src/app/Commons/classes/Constants';
import { Utilities } from 'src/app/Commons/classes/Utilities';

@Injectable({
  providedIn: 'root'
})
export class FieldOptionService implements dataServiceInterface<FieldOptions>
{

  constructor(private http:HttpClient) { }

  getData(model?: any): Observable<GenericResponse<FieldOptions>> {
    var endpoint = Constants.GetFieldOptionEP;
    var headers = Utilities.setDefaultHeaders();
    var params = Utilities.setDefaultParams(model);

    return this.http.get<GenericResponse<FieldOptions>>(endpoint,
      {params:params,headers:headers})
  }
  saveData(model?: Array<FieldOptions>): Observable<GenericResponse<FieldOptions>> {
    var endpoint = Constants.CreateFieldOptionEP;
    var headers = Utilities.setDefaultHeaders();
    var body = JSON.stringify(model);

    return this.http.post<GenericResponse<FieldOptions>>(endpoint,body,
      {headers:headers})
  }
  editData(params?: any): Observable<GenericResponse<FieldOptions>> {
    throw new Error('Method not implemented.');
  }
  removeData(params?: any): Observable<GenericResponse<FieldOptions>> {
    throw new Error('Method not implemented.');
  }


}
