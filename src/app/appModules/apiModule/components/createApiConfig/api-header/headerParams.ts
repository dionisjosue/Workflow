import { Field } from "src/app/appModules/fieldModule/classes/Field";
import { apiConfiguration } from "../create-api-config/apiConfiguration";
import { BaseEntity } from "@share/classes/BaseEntity";

export class headerParams extends BaseEntity<number>{

    name:string;
    value:string;
    fieldFk:number;
    field:Field;
    apiConfigurationFk:number;
    apiConfiguration:apiConfiguration;
}