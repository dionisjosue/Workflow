import { BaseEntity } from "@share/classes/BaseEntity";

export class FieldOptions extends BaseEntity<number>
{ 
    field_fk:number;
    displayValue:string;
    realValue:string;
    idx_field_fk:number;
}
