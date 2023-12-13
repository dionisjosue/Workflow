import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { dataServiceInterface } from '@share/services/dataServiceInterface';
import { GenericResponse } from '@share/classes/GenericResponse';
import { documentFilter } from '@template/classes/documentFilter';
import { Constants } from '@share/classes/Constants';
import { Utilities } from '@share/Utilities';
import { document } from '@template/classes/document';

@Injectable({
  providedIn: 'root'
})
export class TemplateService implements dataServiceInterface<document> {

  constructor(private http:HttpClient) { }


  getData(filter?: documentFilter): Observable<GenericResponse<document>> {
    var endpoint = Constants.GetDocumentEP;
    var headers = Utilities.setDefaultHeaders();

    var params = Utilities.setDefaultParams(filter);
    if(filter != null)
    {

    }
    return this.http.get<GenericResponse<document>>(endpoint,
      {params:params,headers:headers})
  }
  saveData(params?: Array<document>): Observable<GenericResponse<document>> {
    //arreglar esto
    var endpoint = Constants.CreateDocumentEP;
    var body = JSON.stringify(params);
    var headers = Utilities.setDefaultHeaders();
    return this.http.post<GenericResponse<document>>(endpoint,body,{headers})
  }

  editData(params?: Array<document>): Observable<GenericResponse<document>> 
  {
    let copy = JSON.parse(JSON.stringify(params)) as Array<document>;
    //remove areas to avoid errors
    copy.map(t=> {
      t.steps.map(r=> {r.step = null })
    });

    var endpoint = Constants.EditDocumentEP;
    var body = JSON.stringify(copy);
    var headers = Utilities.setDefaultHeaders();
    console.log(body);
    return this.http.post<GenericResponse<document>>(endpoint,body,{headers})
  }
  removeData(params?: any): Observable<GenericResponse<document>> {
    throw new Error('Method not implemented.');
  }
}
