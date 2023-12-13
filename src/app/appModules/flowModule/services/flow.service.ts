import { ErrorHandler, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http'; 
import { Observable, catchError, map, of, pipe, retry } from 'rxjs';
import { Flow } from '../classes/Flow';
import { dataServiceInterface } from '@share/services/dataServiceInterface';
import { GenericResponse } from '@share/classes/GenericResponse';
import { FlowFilter } from '../classes/FlowFilter';
import { Constants } from '@share/classes/Constants';
import { Utilities } from '@share/Utilities';


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

    let result =  this.http.get<GenericResponse<Flow>>(endpoint,
      {params:params,headers:headers});

      console.log("ey");
    result = result.pipe(
      //retry(3),
      catchError(error=>
      {
        console.log(error);
        var resp = new GenericResponse<Flow>();
        resp.handleHttpError(error);
        return of(resp);
      }),
      map(data=>{
        return data;
      })
    );
    
    return result;
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
