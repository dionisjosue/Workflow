import { BaseEntity } from "src/app/Commons/classes/BaseEntity";
import { ConditionalFields } from "src/app/conditional/classes/ConditionalFields";
import { apiConfiguration } from "./apiConfiguration";
import { apiConditionalSteps } from "./apiConditionalSteps";
import { apiConditionalForms } from "./apiConditionalForms";
import { apiConditionalFields } from "./apiConditionalFields";

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