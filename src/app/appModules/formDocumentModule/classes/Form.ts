import { BaseEntity } from "@share/classes/BaseEntity";
import { FormField } from "./FormField";
import { FormStep } from "./FormStep";

export class Form extends BaseEntity<number>{

    title:string;
    description:string;
    titleButtonName:string;
    formFields:Array<FormField>;
    formSteps:Array<FormStep>;

}