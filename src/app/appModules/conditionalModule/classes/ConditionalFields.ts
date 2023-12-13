import { BaseEntity } from "@share/classes/BaseEntity";
import { apiConditionals } from "src/app/appModules/apiModule/components/conditional-api/apiConditionals";

export class ConditionalFields extends BaseEntity<number>{

    fieldFk:number;
   // field:Field;
    expectedValue:string;
    fieldToCompareFk:number;
   // fieldCompare:Field;
    conditionalFk:number;
   // conditional:Conditional
    order:number;
    nextLogicalOperator:string;
    comparisonSign:number;
    apiConditionalFk:number;
    apiConditionals:apiConditionals;



}