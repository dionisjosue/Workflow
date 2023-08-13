import { HttpHeaders, HttpParams } from "@angular/common/http";
import { BaseFilter } from "./BaseFilter";

export class Utilities
{
    static setDefaultHeaders():HttpHeaders{
        var headers = new HttpHeaders({
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With,X-CSRF-Token"
        });
        return headers;
    }
    static check(field):boolean{
        if(field != 'undefined' && field != null)
            return true;
        return false;
    } 
    static setDefaultParams(filter:BaseFilter):HttpParams
    {
        var params = new HttpParams();

        params = Utilities.check(filter.createdBy)? params.append("CreatedBy",filter.createdBy):
        params;

        params = Utilities.check(filter.createdDate)? params.append("CreatedDate",filter.createdDate):
        params;


        params = Utilities.check(filter.currentPage)? params.append("CurrentPage",filter.currentPage):
        params;

        params;

        params = Utilities.check(filter.itemPerPage)? params.append("itemPerPage",filter.createdBy):
        params;

        params;

        params = Utilities.check(filter.lastId)? params.append("LastId",filter.lastId):
        params;

        params = Utilities.check(filter.id)? params.append("Id",filter.id):
        params;
        
        return params;
    }

}