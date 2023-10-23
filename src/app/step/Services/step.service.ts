import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Step } from '../Classes/Step';
import {Observable} from 'rxjs'
import { stepFilter } from '../Classes/stepFilter';
import { dataServiceInterface } from 'src/app/Commons/dataServiceInterface';
import { GenericResponse } from 'src/app/Commons/classes/GenericResponse';
import { Constants } from 'src/app/Commons/classes/Constants';
import { Utilities } from 'src/app/Commons/classes/Utilities';
@Injectable({
  providedIn: 'root'
})
export class StepService implements dataServiceInterface<Step> {

  constructor(private http:HttpClient) { }
  removeData(params?: any): Observable<GenericResponse<Step>> {
    throw new Error('Method not implemented.');
  }

  saveData(params:Array<Step>):Observable<GenericResponse<Step>>{
    var endpoint = Constants.CreateStepEP;
    var body = JSON.stringify(params);
    var headers = Utilities.setDefaultHeaders();
    return this.http.post<GenericResponse<Step>>(endpoint,body,{headers})
  }

  editData(params:Array<Step>):Observable<GenericResponse<Step>>{
    var endpoint = Constants.EditStepEP;
    var body = JSON.stringify(params);
    var headers = Utilities.setDefaultHeaders();
    return this.http.post<GenericResponse<Step>>(endpoint,body,{headers})
  }

  getData(filter:stepFilter):Observable<GenericResponse<Step>>
  {
    var endpoint = Constants.GetStepEP;
    var headers = Utilities.setDefaultHeaders();

    var params = Utilities.setDefaultParams(filter);
    if(filter != null)
    {

      params = Utilities.check(filter.stepName)? params.append("StepName",filter.stepName):
              params;

      params = Utilities.check(filter.areaFk)? params.append("AreaFk",filter.areaFk):
                params;
    }

    return this.http.get<GenericResponse<Step>>(endpoint,
      {params:params,headers:headers})
  }

}
