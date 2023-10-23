import { Injectable } from '@angular/core';
import { dataServiceInterface } from 'src/app/Commons/dataServiceInterface';
import { Section } from '../Classes/Section';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Utilities } from 'src/app/Commons/classes/Utilities';
import { GenericResponse } from 'src/app/Commons/classes/GenericResponse';
import { Constants } from 'src/app/Commons/classes/Constants';

@Injectable({
  providedIn: 'root'
})
export class SectionService implements dataServiceInterface<Section> {

  private headers:HttpHeaders;
  constructor(private http:HttpClient) { 
    this.headers = Utilities.setDefaultHeaders();
  }

  getData(filters?: any): Observable<GenericResponse<Section>> {
    let endpoint = Constants.GetSectionEP;
    let params = new HttpParams();

    return this.http.get<GenericResponse<Section>>(endpoint,{params,headers:this.headers});
  }
  saveData(model?: any): Observable<GenericResponse<Section>> {
    var endpoint = Constants.CreateSectionEP;

    var params = JSON.stringify(model)
 
    return this.http.post<GenericResponse<Section>>(endpoint,params,{headers:this.headers});
  }
  editData(model?: any): Observable<GenericResponse<Section>> {
    var endpoint = Constants.EditSectionEP;

    var params = JSON.stringify(model)
 
    return this.http.post<GenericResponse<Section>>(endpoint,params,{headers:this.headers});
  }
  removeData(params?: any): Observable<GenericResponse<Section>> {
    throw new Error('Method not implemented.');
  }
}
