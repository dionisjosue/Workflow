import { BaseEntity } from "src/app/Commons/classes/BaseEntity";
import { apiConfiguration } from "./apiConfiguration";
import { Step } from "src/app/step/Classes/Step";
import { apiConditionals } from "./apiConditionals";

export class apiConditionalSteps extends BaseEntity<number>{
    
    apiConfigurationFk:number;
    apiConfiguration:apiConfiguration;
    stepFk:number;
    step:Step;
    eventType:number;
    apiConditionalFk:number;
    apiConditional:apiConditionals;
}