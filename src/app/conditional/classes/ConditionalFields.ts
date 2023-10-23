import { Conditional } from "@angular/compiler";
import { BaseEntity } from "src/app/Commons/classes/BaseEntity";
import { apiConditionals } from "src/app/api-config/classes/apiConditionals";
import { apiConfiguration } from "src/app/api-config/classes/apiConfiguration";
import { Field } from "src/app/field/classes/Field";

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