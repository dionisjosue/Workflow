import { BaseEntity } from "@share/classes/BaseEntity";
import { Form } from "./Form";
import { Step } from "@step/classes/Step";

export class FormStep extends BaseEntity<number>{
    
    constructor(stepFk){
        super();
        this.stepFk = stepFk;
        this.formFk = 0;
    }

    stepFk:number;
    formFk:number;
    form?:Form;
    step?:Step;
}