import { BaseEntity } from "src/app/Commons/classes/BaseEntity";
import { Option } from "./Option";

export class FieldOptions extends BaseEntity<number>
{ 
    field_fk:number;
    displayValue:string;
    realValue:string;
    idx_field_fk:number;
}
