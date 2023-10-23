import { BaseEntity } from "src/app/Commons/classes/BaseEntity";
import { apiConfiguration } from "./apiConfiguration";
import { Form } from "src/app/form/Classes/Form";
import { apiConditionals } from "./apiConditionals";

export class apiConditionalForms extends BaseEntity<number>{
    
    apiConfigurationFk:number;
    apiConfiguration:apiConfiguration;
    formFk:number;
    form:Form;
    eventType:number;
    apiConditionalFk:number;
    apiConditional:apiConditionals;
    
}