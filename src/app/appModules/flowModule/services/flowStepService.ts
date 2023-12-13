import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'; 
import { Observable, shareReplay } from 'rxjs';
import { FlowStepFilter } from '../classes/FlowStepFilter';
import { dataServiceInterface } from '@share/services/dataServiceInterface';
import { Constants } from '@share/classes/Constants';
import { GenericResponse } from '@share/classes/GenericResponse';
import { FlowStep } from '@flow/classes/FlowStep';
import { Utilities } from '@share/Utilities';



@Injectable({
  providedIn: 'root'
})
export class FlowStepService implements dataServiceInterface<FlowStep>{

  constructor(private http:HttpClient) { }
 
  getData(filter:FlowStepFilter):Observable<GenericResponse<FlowStep>>{
    var endpoint = Constants.GetFlowStepEP;
    var headers = Utilities.setDefaultHeaders();


    var params = Utilities.setDefaultParams(filter);

    params = Utilities.check(filter.flowFk)? params.append("FlowFk",filter.flowFk):
    params;

    return this.http.get<GenericResponse<FlowStep>>(endpoint,
      {params:params,headers:headers})
  }
  saveData(model:Array<FlowStep>):Observable<GenericResponse<FlowStep>>{
    var endpoint = Constants.CreateFlowStepEP;
    var body = JSON.stringify(model);
    var headers = Utilities.setDefaultHeaders();
    return this.http.post<GenericResponse<FlowStep>>(endpoint,body,{headers})
  }
  editData(model:Array<FlowStep>):Observable<GenericResponse<FlowStep>>{

    var endpoint = Constants.EditFlowStepEP;
    var body = JSON.stringify(model);
    var headers = Utilities.setDefaultHeaders();
    return this.http.post<GenericResponse<FlowStep>>(endpoint,body,{headers})
  }

  removeData(params?: any): Observable<GenericResponse<FlowStep>> {
    throw new Error('Method not implemented.');
  }



}
