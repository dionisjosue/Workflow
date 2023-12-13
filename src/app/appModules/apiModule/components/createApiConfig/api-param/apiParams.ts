import { Field } from "@field/classes/Field";
import { apiConfiguration } from "../create-api-config/apiConfiguration";
import { BaseEntity } from "@share/classes/BaseEntity";

export class apiParams extends BaseEntity<number>{

    name:string;
    value?:string;
    fieldFk?:number;
    field:Field;
    apiConfigurationFk:number;
    apiConfiguration:apiConfiguration;
    
}