import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import { dataServiceInterface } from 'src/app/Commons/dataServiceInterface';
import { Conditional } from '../classes/Conditional';
import { Constants } from 'src/app/Commons/classes/Constants';
import { Utilities } from 'src/app/Commons/classes/Utilities';
import { GenericResponse } from 'src/app/Commons/classes/GenericResponse';

@Injectable({
  providedIn: 'root'
})
export class ConditionalService implements dataServiceInterface<Conditional> {

  constructor(private http:HttpClient) { }
  
  removeData(params?: any): Observable<GenericResponse<Conditional>> {
    throw new Error('Method not implemented.');
  }

  getData(model):Observable<GenericResponse<Conditional>>{
    var endpoint = Constants.GetConditionalEP;
    var headers = Utilities.setDefaultHeaders();

    var params = Utilities.setDefaultParams(null);

    return this.http.get<GenericResponse<Conditional>>(endpoint,
      {params:params,headers:headers})
  }
  saveData(model:Array<Conditional>){
    var endpoint = Constants.CreateConditionalEP;
    var body = JSON.stringify(model);
    var headers = Utilities.setDefaultHeaders();
    return this.http.post<GenericResponse<Conditional>>(endpoint,body,{headers})
  }
  editData(model:Array<Conditional>){
    var endpoint = Constants.EditConditionalEP;
    var body = JSON.stringify(model);
    var headers = Utilities.setDefaultHeaders();
    return this.http.post<GenericResponse<Conditional>>(endpoint,body,{headers})
  }
}
