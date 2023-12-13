import { HttpErrorResponse, HttpResponse } from "@angular/common/http";

export  class genericErrors{


    title:string;
    detailedMessage:string;


    public buildError(error:HttpErrorResponse){

        console.log(error);


        this.title = "";
        this.detailedMessage = "";
    }

}