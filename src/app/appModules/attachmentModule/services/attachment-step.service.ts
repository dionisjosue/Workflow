import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { dataServiceInterface } from '@share/services/dataServiceInterface';
import { AttachmentSteps } from '@attachment/classes/AttachmentSteps';
import { GenericResponse } from '@share/classes/GenericResponse';
import { Constants } from '@share/classes/Constants';
import { Utilities } from '@share/Utilities';

@Injectable({
  providedIn: 'root'
})
export class AttachmentStepService implements dataServiceInterface<AttachmentSteps>
{

  constructor(private http:HttpClient) { }

  getData(model?: any): Observable<GenericResponse<AttachmentSteps>> {
    var endpoint = Constants.GetAttachmentStepEP;
    var headers = Utilities.setDefaultHeaders();
    var params = Utilities.setDefaultParams(model);

    return this.http.get<GenericResponse<AttachmentSteps>>(endpoint,
      {params:params,headers:headers})
  }
  saveData(model: Array<AttachmentSteps>): Observable<GenericResponse<AttachmentSteps>> {
    var endpoint = Constants.CreateAttachmentStepEP;
    var body = JSON.stringify(model);
    var headers = Utilities.setDefaultHeaders();
    return this.http.post<GenericResponse<AttachmentSteps>>(endpoint,body,{headers})
  }
  editData(model:Array<AttachmentSteps>): Observable<GenericResponse<AttachmentSteps>> {
    var endpoint = Constants.EditAttachmentStepEP;
    var body = JSON.stringify(model);
    var headers = Utilities.setDefaultHeaders();
    return this.http.post<GenericResponse<AttachmentSteps>>(endpoint,body,{headers})
  }
  removeData(params?: any): Observable<GenericResponse<AttachmentSteps>> {
    throw new Error('Method not implemented.');
  }



}
