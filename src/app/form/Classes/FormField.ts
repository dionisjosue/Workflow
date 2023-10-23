import { BaseEntity } from "src/app/Commons/classes/BaseEntity";
import { Field } from "src/app/field/classes/Field";
import { Form } from "./Form";
import { Section } from "./Section";

export class FormField extends BaseEntity<number>{

    fieldFk:number;
    formFk:number;
    field?:Field;
    form?:Form;
    sectionFk:number;
    section?:Section;
    isRequired:boolean;
    isReadonly:boolean;
    order?:number;
    columnTemplate:number;
    sectionOrder:number;

  
    
}