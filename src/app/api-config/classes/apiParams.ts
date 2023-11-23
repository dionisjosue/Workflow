import { BaseEntity } from "src/app/Commons/classes/BaseEntity";
import { Field } from "src/app/field/classes/Field";
import { apiConfiguration } from "./apiConfiguration";

export class apiParams extends BaseEntity<number>{

    name:string;
    value?:string;
    fieldFk?:number;
    field:Field;
    apiConfigurationFk:number;
    apiConfiguration:apiConfiguration;
    
}