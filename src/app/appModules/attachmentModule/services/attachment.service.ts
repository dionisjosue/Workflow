import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { dataServiceInterface } from '@share/services/dataServiceInterface';
import { Attachment } from '@attachment/classes/Attachment';
import { GenericResponse } from '@share/classes/GenericResponse';
import { Constants } from '@share/classes/Constants';
import { Utilities } from '@share/Utilities';

@Injectable({
  providedIn: 'root'
})
export class AttachmentService implements dataServiceInterface<Attachment>
{

  constructor(private http:HttpClient) { }

  getData(model?: any): Observable<GenericResponse<Attachment>> {
    var endpoint = Constants.GetAttachmentEP;
    var headers = Utilities.setDefaultHeaders();
    var params = Utilities.setDefaultParams(model);

    return this.http.get<GenericResponse<Attachment>>(endpoint,
      {params:params,headers:headers})
  }
  saveData(model: Array<Attachment>): Observable<GenericResponse<Attachment>> {
    var endpoint = Constants.CreateAttachmentEP;
    var body = JSON.stringify(model);
    var headers = Utilities.setDefaultHeaders();
    return this.http.post<GenericResponse<Attachment>>(endpoint,body,{headers})
  }
  editData(model:Array<Attachment>): Observable<GenericResponse<Attachment>> {
    var endpoint = Constants.EditAttachmentEP;
    var body = JSON.stringify(model);
    var headers = Utilities.setDefaultHeaders();
    return this.http.post<GenericResponse<Attachment>>(endpoint,body,{headers})
  }
  removeData(params?: any): Observable<GenericResponse<Attachment>> {
    throw new Error('Method not implemented.');
  }



}
