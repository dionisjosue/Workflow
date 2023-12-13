import { PropertyInfo } from "@api/components/createApiConfig/json-props/PropertyInfo";
import { Field } from "@field/classes/Field";

export class apiFields{
    
    fieldFk?:number;
    field:Field;
    apiConfigFk:number;
    jsonPropName:string;
    value?:string;


    constructor(_apiConfigFk:number,_jsonPropName:string,
        _value?:string,_fieldFk?:number,)
    {
        this.apiConfigFk = _apiConfigFk;
        this.jsonPropName = _jsonPropName;
        this.fieldFk = _fieldFk;
        this.value = _value;
    }


}