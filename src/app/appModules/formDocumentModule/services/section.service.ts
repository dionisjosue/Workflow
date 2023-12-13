import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { dataServiceInterface } from '@share/services/dataServiceInterface';
import { Section } from '@form/classes/Section';
import { Utilities } from '@share/Utilities';
import { GenericResponse } from '@share/classes/GenericResponse';
import { Constants } from '@share/classes/Constants';

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
