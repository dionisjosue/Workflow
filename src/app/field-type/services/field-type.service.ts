import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from 'src/app/Commons/classes/Constants';
import { GenericResponse } from 'src/app/Commons/classes/GenericResponse';
import { Utilities } from 'src/app/Commons/classes/Utilities';
import { dataServiceInterface } from 'src/app/Commons/dataServiceInterface';
import { FieldType } from 'src/app/field/classes/FieldType';

@Injectable({
  providedIn: 'root'
})
export class FieldTypeService implements dataServiceInterface<FieldType>{

  constructor(private http:HttpClient) { }
  
  getData(model?: any): Observable<GenericResponse<FieldType>> 
  {
    var endpoint = Constants.GetFieldTypeEP;
    var headers = Utilities.setDefaultHeaders();


    var params = Utilities.setDefaultParams(model);


    return this.http.get<GenericResponse<FieldType>>(endpoint,
      {params:params,headers:headers})
   
  }
  saveData(params?: any): Observable<GenericResponse<FieldType>> {
    throw new Error('Method not implemented.');
  }
  editData(params?: any): Observable<GenericResponse<FieldType>> {
    throw new Error('Method not implemented.');
  }
  removeData(params?: any): Observable<GenericResponse<FieldType>> {
    throw new Error('Method not implemented.');
  }
}
