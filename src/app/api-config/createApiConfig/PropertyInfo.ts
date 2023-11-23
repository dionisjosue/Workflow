import { Field } from "src/app/field/classes/Field";

export interface PropertyInfo {
    propName: string;
    type: string;
    children?: PropertyInfo[];
    value?: any;
    fieldMapped?:number;
    valueMapped?:string;
    FieldsData?:Field[];
  }
  