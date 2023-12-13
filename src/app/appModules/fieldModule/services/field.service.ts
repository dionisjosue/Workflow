import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { dataServiceInterface } from '@share/services/dataServiceInterface';
import { GenericResponse } from '@share/classes/GenericResponse';
import { Constants } from '@share/classes/Constants';
import { Field } from '@field/classes/Field';
import { FieldFilter } from '@field/classes/FieldFilter';
import { Utilities } from '@share/Utilities';

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
      {params:params,headers:headers}).pipe(
        catchError((error:HttpErrorResponse)=>
        {
          let rep = new GenericResponse<Field>();
          rep.handleHttpError(error);
          return of(rep);
        })
      );
  }
  saveData(model: Array<Field>): Observable<GenericResponse<Field>> {
    var endpoint = Constants.CreateFieldEP;
    var body = JSON.stringify(model);
    var headers = Utilities.setDefaultHeaders();
    return this.http.post<GenericResponse<Field>>(endpoint,body,{headers}).pipe(
      catchError((error:HttpErrorResponse)=>
      {
        let rep = new GenericResponse<Field>();
        rep.handleHttpError(error);
        return of(rep);
      })
    );
  }
  editData(model:Array<Field>): Observable<GenericResponse<Field>> {
    var endpoint = Constants.EditFieldEP;
    var body = JSON.stringify(model);
    var headers = Utilities.setDefaultHeaders();
    return this.http.post<GenericResponse<Field>>(endpoint,body,{headers}).pipe(
      catchError((error:HttpErrorResponse)=>
      {
        let rep = new GenericResponse<Field>();
        rep.handleHttpError(error);
        return of(rep);
      })
    )
  }
  removeData(params?: any): Observable<GenericResponse<Field>> {
    throw new Error('Method not implemented.');
  }


}
