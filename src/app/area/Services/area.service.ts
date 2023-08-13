import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from 'src/app/Commons/Constants';
import { Utilities } from 'src/app/Commons/Utilities';
import { Area } from '../Area';
import {Observable} from "rxjs";
import { GenericResponse } from 'src/app/Commons/GenericResponse';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  constructor(private http:HttpClient) { }

  getArea():Observable<GenericResponse<Area>>{
    var endpoint = Constants.GetAreaEP;
    var headers = Utilities.setDefaultHeaders();

    var params = Utilities.setDefaultParams(null);


    return this.http.get<GenericResponse<Area>>(endpoint,
      {params:params,headers:headers})
  }
  saveArea(model:Area){
    var endpoint = Constants.CreateAreaEP;
    var body = JSON.stringify(model);
    var headers = Utilities.setDefaultHeaders();
    return this.http.post<GenericResponse<Area>>(endpoint,body,{headers})
  }
  editArea(model:Area){
    var endpoint = Constants.EditAreaEP;
    var body = JSON.stringify(model);
    var headers = Utilities.setDefaultHeaders();
    return this.http.post<GenericResponse<Area>>(endpoint,body,{headers})
  }
}
