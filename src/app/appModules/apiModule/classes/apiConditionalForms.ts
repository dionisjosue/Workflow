import { apiConditionals } from "@api/components/conditional-api/apiConditionals";
import { apiConfiguration } from "@api/components/createApiConfig/create-api-config/apiConfiguration";
import { Form } from "@form/classes/Form";
import { BaseEntity } from "@share/classes/BaseEntity";

export class apiConditionalForms extends BaseEntity<number>{
    
    apiConfigurationFk:number;
    apiConfiguration:apiConfiguration;
    formFk:number;
    form:Form;
    eventType:number;
    apiConditionalFk:number;
    apiConditional:apiConditionals;
    
}