import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { dataServiceInterface } from '@share/services/dataServiceInterface';
import { Observable } from 'rxjs';
import { Product } from '../classes/Product';
import { GenericResponse } from '@share/classes/GenericResponse';
import { Constants } from '@share/classes/Constants';
import { Utilities } from '@share/Utilities';

@Injectable({
  providedIn: 'root'
})
export class ProductService implements dataServiceInterface<Product> {

  constructor(private http:HttpClient) { }
  removeData(params?: any): Observable<GenericResponse<Product>> {
    throw new Error('Method not implemented.');
  }

  saveData(params:Array<Product>):Observable<GenericResponse<Product>>{
    var endpoint = Constants.CreateProductEP;
    var body = JSON.stringify(params);
    var headers = Utilities.setDefaultHeaders();
    return this.http.post<GenericResponse<Product>>(endpoint,body,{headers})
  }

  editData(params:Array<Product>):Observable<GenericResponse<Product>>{
    var endpoint = Constants.EditProductEP;
    var body = JSON.stringify(params);
    var headers = Utilities.setDefaultHeaders();
    return this.http.post<GenericResponse<Product>>(endpoint,body,{headers})
  }

  getData(inputs?:any):Observable<GenericResponse<Product>>
  {
    var endpoint = Constants.GetProductEP;
    var headers = Utilities.setDefaultHeaders();

    var params = Utilities.setDefaultParams(null);

    return this.http.get<GenericResponse<Product>>(endpoint,
      {params:params,headers:headers})
  }
}
