import { Field } from "src/app/appModules/fieldModule/classes/Field";
import { Form } from "./Form";
import { Section } from "./Section";
import { BaseEntity } from "@share/classes/BaseEntity";

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