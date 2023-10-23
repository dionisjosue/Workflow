import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'; 
import { Observable, shareReplay } from 'rxjs';
import { dataServiceInterface } from 'src/app/Commons/dataServiceInterface';
import { FlowStep } from 'src/app/flow-step/class/FlowStep';
import { FlowFilter } from 'src/app/flow/Classes/FlowFilter';
import { FlowStepFilter } from '../class/FlowStepFilter';
import { GenericResponse } from 'src/app/Commons/classes/GenericResponse';
import { Constants } from 'src/app/Commons/classes/Constants';
import { Utilities } from 'src/app/Commons/classes/Utilities';



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
