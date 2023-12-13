import { HttpErrorResponse } from "@angular/common/http";
import { statusApiResult } from "./statusApiResult";

export class GenericResponse<T>{

    data:T;
    items:Array<T>;
    //success:boolean;
    result:statusApiResult;
  //  message:string;
  //  detailedMessage:string;
  //  code:number;

  constructor(){
    this.result = new statusApiResult();
  }

    public handleHttpError(error:HttpErrorResponse)
    {
        this.result.success = false;

        if(error.status == 0){
            this.result.message = error.statusText;
            this.result.detailedMessage = error.message;
            this.result.code = 500;
        }
        else if(error && error.error){
            this.result.message = error.error.message;
            this.result.detailedMessage = "";
            this.result.code = error.error.code;
        }
    }
}