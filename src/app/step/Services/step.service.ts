import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Step } from '../Classes/Step';
import {Observable} from 'rxjs'
import { GenericResponse } from 'src/app/Commons/GenericResponse';
import { Constants } from 'src/app/Commons/Constants';
import { Utilities } from 'src/app/Commons/Utilities';
import { stepFilter } from '../Classes/stepFilter';
@Injectable({
  providedIn: 'root'
})
export class StepService {

  constructor(private http:HttpClient) { }

  saveStep(params:Step):Observable<GenericResponse<Step>>{
    var endpoint = Constants.CREATE_STEP;
    var body = JSON.stringify(params);
    var headers = Utilities.setDefaultHeaders();
    return this.http.post<GenericResponse<Step>>(endpoint,body,{headers})
  }

  editStep(params:Step):Observable<GenericResponse<Step>>{
    var endpoint = Constants.EDIT_STEP;
    var body = JSON.stringify(params);
    var headers = Utilities.setDefaultHeaders();
    return this.http.post<GenericResponse<Step>>(endpoint,body,{headers})
  }

  getSteps(filter:stepFilter):Observable<GenericResponse<Step>>
  {
    var endpoint = Constants.GetStepEP;
    var headers = Utilities.setDefaultHeaders();

    var params = Utilities.setDefaultParams(filter);

    if(filter != null)
    {
      params = Utilities.check(filter.createdBy)? params.append("StepName",filter.stepName):
              params;

      params = Utilities.check(filter.createdDate)? params.append("AreaFk",filter.areaFk):
                params;
    }

    return this.http.get<GenericResponse<Step>>(endpoint,
      {params:params,headers:headers})
  }

}
