import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'; 
import { Observable, shareReplay } from 'rxjs';
import { Constants } from '../../Commons/Constants';
import { FlowFilter } from '../Classes/FlowFilter';
import { Flow } from '../Classes/Flow';
import { Utilities } from 'src/app/Commons/Utilities';
import { GenericResponse } from 'src/app/Commons/GenericResponse';



@Injectable({
  providedIn: 'root'
})
export class FlowService {

  constructor(private http:HttpClient) { }

  getFlows(filter:FlowFilter):Observable<GenericResponse<Flow>>{
    var endpoint = Constants.GetFlowEP;
    var headers = Utilities.setDefaultHeaders();

    var params = new HttpParams();

    
    params = Utilities.check(filter.createdBy)? params.append("CreatedBy",filter.createdBy):
              params;

    params = Utilities.check(filter.createdDate)? params.append("CreatedDate",filter.createdDate):
    params;


    params = Utilities.check(filter.currentPage)? params.append("CurrentPage",filter.currentPage):
    params;

    params = Utilities.check(filter.flowName)? params.append("FlowName",filter.flowName):
    params;

    params = Utilities.check(filter.itemPerPage)? params.append("CreatedBy",filter.createdBy):
    params;

    params = Utilities.check(filter.productFk)? params.append("ProductFk",filter.productFk):
    params;

    params = Utilities.check(filter.lastId)? params.append("LastId",filter.lastId):
    params;

    params = Utilities.check(filter.id)? params.append("Id",filter.id):
    params;

    return this.http.get<GenericResponse<Flow>>(endpoint,
      {params:params,headers:headers})
  }
  saveFlows(model:Flow):Observable<GenericResponse<Flow>>{
    var endpoint = Constants.CreateFlowEP;
    var body = JSON.stringify(model);
    var headers = Utilities.setDefaultHeaders();
    return this.http.post<GenericResponse<Flow>>(endpoint,body,{headers})
  }
  editFlows(model:Flow):Observable<GenericResponse<Flow>>{

    var endpoint = Constants.EditFlowEP;
    var body = JSON.stringify(model);
    var headers = Utilities.setDefaultHeaders();
    return this.http.post<GenericResponse<Flow>>(endpoint,body,{headers})
  }


}
