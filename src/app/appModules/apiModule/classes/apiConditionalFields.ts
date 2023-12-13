import { apiConfiguration } from "../components/createApiConfig/create-api-config/apiConfiguration";
import { Field } from "@field/classes/Field";
import { apiConditionals } from "../components/conditional-api/apiConditionals";
import { BaseEntity } from "@share/classes/BaseEntity";

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