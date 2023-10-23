import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'; 
import { Observable, shareReplay } from 'rxjs';
import { FlowFilter } from '../Classes/FlowFilter';
import { Flow } from '../Classes/Flow';
import { dataServiceInterface } from 'src/app/Commons/dataServiceInterface';
import { GenericResponse } from 'src/app/Commons/classes/GenericResponse';
import { Constants } from 'src/app/Commons/classes/Constants';
import { Utilities } from 'src/app/Commons/classes/Utilities';



@Injectable({
  providedIn: 'root'
})
export class FlowService implements dataServiceInterface<Flow>{

  constructor(private http:HttpClient) { }

  getData(filter:FlowFilter):Observable<GenericResponse<Flow>>{
    var endpoint = Constants.GetFlowEP;
    var headers = Utilities.setDefaultHeaders();


    var params = Utilities.setDefaultParams(filter);

    params = Utilities.check(filter.flowName)? params.append("FlowName",filter.flowName):
    params;

    params = Utilities.check(filter.productFk)? params.append("ProductFk",filter.productFk):
    params;


    return this.http.get<GenericResponse<Flow>>(endpoint,
      {params:params,headers:headers})
  }
  saveData(model:Array<Flow>):Observable<GenericResponse<Flow>>{
    var endpoint = Constants.CreateFlowEP;
    var body = JSON.stringify(model);
    var headers = Utilities.setDefaultHeaders();
    return this.http.post<GenericResponse<Flow>>(endpoint,body,{headers})
  }
  editData(model:Array<Flow>):Observable<GenericResponse<Flow>>{

    var endpoint = Constants.EditFlowEP;
    var body = JSON.stringify(model);
    var headers = Utilities.setDefaultHeaders();
    return this.http.post<GenericResponse<Flow>>(endpoint,body,{headers})
  }
  removeData(id:number):Observable<GenericResponse<Flow>>{

    var endpoint = Constants.RemoveFlowEP;
    //var body = JSON.stringify(flow);
    var headers = Utilities.setDefaultHeaders();
    return this.http.delete<GenericResponse<Flow>>(endpoint + "/" +id ,{headers});
  }


}
