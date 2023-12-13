import { BaseEntity } from "@share/classes/BaseEntity";
import { ConditionalFields } from "@conditional/classes/ConditionalFields";
import { apiConfiguration } from "../createApiConfig/create-api-config/apiConfiguration";
import { apiConditionalSteps } from "@api/classes/apiConditionalSteps";
import { apiConditionalForms } from "@api/classes/apiConditionalForms";
import { apiConditionalFields } from "@api/classes/apiConditionalFields";

export class apiConditionals extends BaseEntity<number>{
    
    name:string;
    conditionals:Array<ConditionalFields>;
    apiConfigFk:number;
    eventTypes:number;
    apiConfiguration:apiConfiguration;
    apiConditionalSteps: Array<apiConditionalSteps>;
    apiConditionalForms:Array<apiConditionalForms>;
    apiConditionalFields:Array<apiConditionalFields>;
}