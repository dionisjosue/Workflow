import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { dataServiceInterface } from '@share/services/dataServiceInterface';
import { GenericResponse } from '@share/classes/GenericResponse';
import { Constants } from '@share/classes/Constants';
import { Module } from './Module';
import { Utilities } from '@share/Utilities';

@Injectable({
  providedIn: 'root'
})
export class ModuleService implements dataServiceInterface<Module>{

  constructor(private http:HttpClient) { }
  removeData(params?: any): Observable<GenericResponse<Module>> {
    throw new Error('Method not implemented.');
  }

  public getData(input?:any):Observable<GenericResponse<Module>>{

    var end= Constants.GetModuleEP;
    var headers = Utilities.setDefaultHeaders();

    var params = Utilities.setDefaultParams(null);

    return this.http.get<GenericResponse<Module>>(end,
      {params:params,headers:headers})

  }
  public saveData(model:Array<Module>):Observable<GenericResponse<Module>>{

    var end= Constants.CreateModuleEP;

    var body = JSON.stringify(model);
    var headers = Utilities.setDefaultHeaders();
    return this.http.post<GenericResponse<Module>>(end,body,{headers})

  }
  public editData(model:Array<Module>):Observable<GenericResponse<Module>>{

    var end= Constants.EditModuleEP;

    var end= Constants.CreateModuleEP;

    var body = JSON.stringify(model);
    var headers = Utilities.setDefaultHeaders();
    return this.http.post<GenericResponse<Module>>(end,body,{headers})

  }
}
