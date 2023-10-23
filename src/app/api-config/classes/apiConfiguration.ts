import { BaseEntity } from "src/app/Commons/classes/BaseEntity";
import { apiParams } from "./apiParams";
import { headerParams } from "./headerParams";
import { apiConditionals } from "./apiConditionals";

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
    apiConditionals:Array<apiConditionals>;
    httpMethodStr:string;
    authTypeStr:string;
}