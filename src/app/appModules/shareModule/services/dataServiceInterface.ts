import { Observable } from "rxjs";
import { GenericResponse } from "@share/classes/GenericResponse";

export interface dataServiceInterface<T>{

    
    getData(params?:any):Observable<GenericResponse<T>>
    saveData(params?:any):Observable<GenericResponse<T>>
    editData(params?:any):Observable<GenericResponse<T>>
    removeData(params?:any):Observable<GenericResponse<T>>


    
}