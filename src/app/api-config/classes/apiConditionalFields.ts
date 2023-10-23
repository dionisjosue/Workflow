import { BaseEntity } from "src/app/Commons/classes/BaseEntity";
import { apiConfiguration } from "./apiConfiguration";
import { Field } from "src/app/field/classes/Field";
import { apiConditionals } from "./apiConditionals";

export class apiConditionalFields extends BaseEntity<number>{

    apiConfigurationFk:number;
    apiConfiguration:apiConfiguration;
    fieldFk:number;
    field:Field;
    apiConditionalFk:number;
    apiConditional:apiConditionals;
    eventType:number;
    comparisonSign:number;
}