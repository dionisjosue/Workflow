import { BaseEntity } from "@share/classes/BaseEntity";
import { FieldOptions } from "./FieldOptions";
import { FieldType } from "./FieldType";

export class Field extends BaseEntity<number>{

    name:string;
    fieldTypeFk:number;
    fieldType:FieldType;
    defaultValue:string;
    maxValue:number|null;
    maxLength:number | null;
    minValue:number| null;
    identifier:string;
    fieldOptions:Array<FieldOptions>;
    idx:number;
    fieldOptionsStr:string[];
    isChecked:boolean = false;
    columnTemplate:number;

    /*
    public getFieldOptions(field:Field):void{
        let opt = field.fieldOptionsStr.map((item)=>({
            name:item,
            idx_field_fk:field.idx,
            field_fk:0,
            realValue:'',
            id:0,
            createdBy :'',
            createdDate :new Date(),
            active:true,
            lastModifiedDate :new Date()
        }));
        field.fieldOptions = opt as Array<FieldOptions>;
        
    }*/

}