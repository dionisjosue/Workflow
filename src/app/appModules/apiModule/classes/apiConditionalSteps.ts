import { apiConditionals } from "@api/components/conditional-api/apiConditionals";
import { apiConfiguration } from "@api/components/createApiConfig/create-api-config/apiConfiguration";
import { BaseEntity } from "@share/classes/BaseEntity";
import { Step } from "@step/classes/Step";

export class apiConditionalSteps extends BaseEntity<number>{
    
    apiConfigurationFk:number;
    apiConfiguration:apiConfiguration;
    stepFk:number;
    step:Step;
    eventType:number;
    apiConditionalFk:number;
    apiConditional:apiConditionals;
}