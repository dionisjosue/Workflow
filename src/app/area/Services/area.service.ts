import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Area } from '../Area';
import {Observable} from "rxjs";
import { dataServiceInterface } from 'src/app/Commons/dataServiceInterface';
import { GenericResponse } from 'src/app/Commons/classes/GenericResponse';
import { Constants } from 'src/app/Commons/classes/Constants';
import { Utilities } from 'src/app/Commons/classes/Utilities';

@Injectable({
  providedIn: 'root'
})
export class AreaService implements dataServiceInterface<Area> {

  constructor(private http:HttpClient) { }
  
  removeData(params?: any): Observable<GenericResponse<Area>> {
    throw new Error('Method not implemented.');
  }

  getData(model):Observable<GenericResponse<Area>>{
    var endpoint = Constants.GetAreaEP;
    var headers = Utilities.setDefaultHeaders();

    var params = Utilities.setDefaultParams(null);


    return this.http.get<GenericResponse<Area>>(endpoint,
      {params:params,headers:headers})
  }
  saveData(model:Array<Area>){
    var endpoint = Constants.CreateAreaEP;
    var body = JSON.stringify(model);
    var headers = Utilities.setDefaultHeaders();
    return this.http.post<GenericResponse<Area>>(endpoint,body,{headers})
  }
  editData(model:Array<Area>){
    var endpoint = Constants.EditAreaEP;
    var body = JSON.stringify(model);
    var headers = Utilities.setDefaultHeaders();
    return this.http.post<GenericResponse<Area>>(endpoint,body,{headers})
  }
}
