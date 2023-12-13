import { apiParams } from "../api-param/apiParams";
import { headerParams } from "../api-header/headerParams";
import { apiConditionals } from "../../conditional-api/apiConditionals";
import { BaseEntity } from "@share/classes/BaseEntity";
import { apiAuthorization } from "@api/classes/apiAuthorization";
import { apiFields } from "@api/classes/apiFields";

export class apiConfiguration extends BaseEntity<number>{
    
    name:string;
    url:string;
    description:string;
    jsonBody:string;
    jsonResponse:string;
    httpMethod:number;
    authType:number;
    fromQuery:boolean;
    paramsValue:Array<apiParams>;
    headers:Array<headerParams>;
    apiConfigAuthorization:apiAuthorization;
    apiConditionals:Array<apiConditionals>;
    httpMethodStr:string;
    authTypeStr:string;
    apiFields:apiFields[]

    constructor(){
        super();
        //this.paramsValue = new arr
    }
}