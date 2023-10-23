import { BaseEntity } from "src/app/Commons/classes/BaseEntity";

export class FieldType extends BaseEntity<number>{

    name:string;
    dataType:string;
    abbreviation:string;
    requireOptions:boolean;
    optionsAllowed:number;
    
}