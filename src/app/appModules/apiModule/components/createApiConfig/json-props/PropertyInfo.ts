import { Field } from "src/app/appModules/fieldModule/classes/Field";

export interface PropertyInfo {
    propName: string;
    type: string;
    children?: PropertyInfo[];
    value?: any;
    fieldMapped?:number;
    valueMapped?:string;
    jsonText?:any;
    rootNumber:number;


    
  }
  
  