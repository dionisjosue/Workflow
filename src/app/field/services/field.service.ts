import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { dataServiceInterface } from 'src/app/Commons/dataServiceInterface';
import { Field } from '../classes/Field';
import { FieldFilter } from '../classes/FieldFilter';
import { GenericResponse } from 'src/app/Commons/classes/GenericResponse';
import { Constants } from 'src/app/Commons/classes/Constants';
import { Utilities } from 'src/app/Commons/classes/Utilities';

@Injectable({
  providedIn: 'root'
})
export class FieldService implements dataServiceInterface<Field>
{

  constructor(private http:HttpClient) { }

  getData(model?: FieldFilter): Observable<GenericResponse<Field>> {
    var endpoint = Constants.GetFieldEP;
    var headers = Utilities.setDefaultHeaders();
    var params = Utilities.setDefaultParams(model);

    if(model != null && model != undefined){
      params = Utilities.check(model.AttachmentField) ?params.append("AttachmentFields",model.AttachmentField):
      params;
    }
  

    return this.http.get<GenericResponse<Field>>(endpoint,
      {params:params,headers:headers})
  }
  saveData(model: Array<Field>): Observable<GenericResponse<Field>> {
    var endpoint = Constants.CreateFieldEP;
    var body = JSON.stringify(model);
    var headers = Utilities.setDefaultHeaders();
    return this.http.post<GenericResponse<Field>>(endpoint,body,{headers})
  }
  editData(model:Array<Field>): Observable<GenericResponse<Field>> {
    var endpoint = Constants.EditFieldEP;
    var body = JSON.stringify(model);
    var headers = Utilities.setDefaultHeaders();
    return this.http.post<GenericResponse<Field>>(endpoint,body,{headers})
  }
  removeData(params?: any): Observable<GenericResponse<Field>> {
    throw new Error('Method not implemented.');
  }


}
